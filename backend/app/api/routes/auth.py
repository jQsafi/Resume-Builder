from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import generate_otp, verify_otp_code, create_access_token, verify_access_token
from app.services.user_service import create_or_authenticate_user, complete_user_tutorial, get_user_by_email

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

class SendOtpRequest(BaseModel):
    email: str

class SendOtpResponse(BaseModel):
    success: bool
    message: str
    dev_otp: Optional[str] = None  # Helper returned in local development

class VerifyOtpRequest(BaseModel):
    email: str
    otp: str
    name: Optional[str] = ""

class AuthResponse(BaseModel):
    token: str
    token_type: str = "Bearer"
    user: dict
    is_new_user: bool = False

@router.post("/send-otp", response_model=SendOtpResponse)
async def send_otp(payload: SendOtpRequest):
    """
    Generates and sends a 6-digit OTP code to the requested email.
    """
    email = payload.email.lower().strip()
    otp = generate_otp(email)
    
    return {
        "success": True,
        "message": f"Verification code sent to {email}",
        "dev_otp": otp
    }

@router.post("/verify-otp", response_model=AuthResponse)
async def verify_otp(payload: VerifyOtpRequest, db: AsyncSession = Depends(get_db)):
    """
    Verifies the 6-digit OTP, checks/persists user existence in the database, and issues a signed JWT access token.
    """
    email = payload.email.lower().strip()
    otp = payload.otp.strip()

    is_valid = verify_otp_code(email, otp)
    if not is_valid:
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired verification code. Please try again."
        )

    # Check if user exists or create new user in DB
    user_payload, is_new = await create_or_authenticate_user(db, email, payload.name or "")

    # Generate JWT Token
    token = create_access_token(data={"sub": email, "user": user_payload})

    return {
        "token": token,
        "token_type": "Bearer",
        "user": user_payload,
        "is_new_user": is_new
    }

@router.post("/tutorial-completed")
async def tutorial_completed(authorization: Optional[str] = Header(None), db: AsyncSession = Depends(get_db)):
    """
    Marks the onboarding tutorial as completed for the authenticated user in the database.
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authentication token missing")

    token = authorization.split(" ")[1]
    payload = verify_access_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    email = payload["sub"]
    success = await complete_user_tutorial(db, email)
    return {"success": success, "email": email}

@router.get("/me")
async def get_current_user(authorization: Optional[str] = Header(None), db: AsyncSession = Depends(get_db)):
    """
    Validates the Bearer JWT token and returns current authenticated user profile from the database.
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authentication token missing")

    token = authorization.split(" ")[1]
    payload = verify_access_token(token)
    if not payload or "user" not in payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    email = payload["sub"]
    db_user = await get_user_by_email(db, email)
    user_data = db_user if db_user else payload["user"]

    return {
        "authenticated": True,
        "user": user_data
    }
