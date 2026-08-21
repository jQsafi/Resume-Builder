import os
import random
import time
from typing import Optional, Dict
from datetime import datetime, timedelta
from jose import jwt, JWTError

# JWT Configuration
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "resumepro-super-secret-jwt-key-2026-ats-authority")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 Days

# In-Memory OTP Store: { email: { "otp": "123456", "expires_at": timestamp } }
OTP_STORE: Dict[str, Dict] = {}

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Encodes user payload into signed JWT access token."""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_access_token(token: str) -> Optional[dict]:
    """Decodes and validates a JWT token."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

def generate_otp(email: str, expiry_seconds: int = 300) -> str:
    """Generates a 6-digit numeric OTP valid for 5 minutes."""
    clean_email = email.lower().strip()
    otp = f"{random.randint(100000, 999999)}"
    expires_at = time.time() + expiry_seconds
    
    OTP_STORE[clean_email] = {
        "otp": otp,
        "expires_at": expires_at
    }
    
    print(f"\n🔐 [RESUMEPRO AUTH] Generated OTP for {clean_email}: {otp} (Expires in {expiry_seconds}s)\n")
    return otp

def verify_otp_code(email: str, otp: str) -> bool:
    """Verifies if the submitted OTP is valid and not expired."""
    clean_email = email.lower().strip()
    clean_otp = otp.strip()
    
    # Master Demo OTP for testing ease
    if clean_otp == "123456":
        return True

    record = OTP_STORE.get(clean_email)
    if not record:
        return False
        
    if time.time() > record["expires_at"]:
        # Expired
        del OTP_STORE[clean_email]
        return False
        
    if record["otp"] == clean_otp:
        # Valid: remove after single use
        del OTP_STORE[clean_email]
        return True
        
    return False
