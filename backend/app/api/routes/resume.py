from fastapi import APIRouter, HTTPException, Depends, Header
from typing import List, Optional
import uuid
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from app.core.database import get_db
from app.core.security import verify_access_token
from app.models.resume import ResumeModel
from app.models.user import UserModel
from app.schemas.resume_schema import ResumeSchema

router = APIRouter(prefix="/api/resumes", tags=["Resumes"])

async def get_optional_user_id(authorization: Optional[str], db: AsyncSession) -> Optional[str]:
    """Helper to extract user_id from optional Authorization header."""
    if not authorization or not authorization.startswith("Bearer "):
        return None
    token = authorization.split(" ")[1]
    payload = verify_access_token(token)
    if not payload or "sub" not in payload:
        return None
    email = payload["sub"]
    result = await db.execute(select(UserModel).where(UserModel.email == email.lower().strip()))
    user = result.scalar_one_or_none()
    return user.id if user else None

@router.get("", response_model=List[ResumeSchema])
async def list_resumes(
    authorization: Optional[str] = Header(None),
    db: AsyncSession = Depends(get_db)
):
    """
    Lists all saved resumes. If authenticated, filters by current user.
    """
    user_id = await get_optional_user_id(authorization, db)
    
    query = select(ResumeModel).order_by(desc(ResumeModel.last_modified))
    if user_id:
        query = query.where((ResumeModel.user_id == user_id) | (ResumeModel.user_id == None))
    
    result = await db.execute(query)
    resumes = result.scalars().all()
    
    return [ResumeSchema(**r.to_schema_dict()) for r in resumes]

@router.post("", response_model=ResumeSchema)
async def create_or_save_resume(
    resume: ResumeSchema,
    authorization: Optional[str] = Header(None),
    db: AsyncSession = Depends(get_db)
):
    """
    Creates or updates a resume document in the database.
    """
    user_id = await get_optional_user_id(authorization, db)
    
    resume_id = resume.id if resume.id and resume.id.strip() else f"resume-{uuid.uuid4().hex[:8]}"
    resume.id = resume_id
    resume.lastModified = datetime.utcnow().isoformat()

    # Check if record exists
    result = await db.execute(select(ResumeModel).where(ResumeModel.id == resume_id))
    existing_record = result.scalar_one_or_none()

    resume_payload = resume.model_dump()

    if existing_record:
        existing_record.title = resume.title or "My Resume"
        existing_record.template_id = resume.templateId or "technical-authority"
        existing_record.theme_color = resume.themeColor or "#00685f"
        existing_record.font_scale = resume.fontScale or "normal"
        existing_record.data = resume_payload
        existing_record.last_modified = datetime.utcnow()
        if user_id and not existing_record.user_id:
            existing_record.user_id = user_id
    else:
        new_record = ResumeModel(
            id=resume_id,
            user_id=user_id,
            title=resume.title or "My Resume",
            template_id=resume.templateId or "technical-authority",
            theme_color=resume.themeColor or "#00685f",
            font_scale=resume.fontScale or "normal",
            data=resume_payload,
            created_at=datetime.utcnow(),
            last_modified=datetime.utcnow()
        )
        db.add(new_record)

    await db.commit()
    return resume

@router.get("/{resume_id}", response_model=ResumeSchema)
async def get_resume(resume_id: str, db: AsyncSession = Depends(get_db)):
    """
    Retrieves a specific resume document by ID from the database.
    """
    result = await db.execute(select(ResumeModel).where(ResumeModel.id == resume_id))
    record = result.scalar_one_or_none()
    if not record:
        raise HTTPException(status_code=404, detail="Resume not found")
    return ResumeSchema(**record.to_schema_dict())

@router.delete("/{resume_id}")
async def delete_resume(resume_id: str, db: AsyncSession = Depends(get_db)):
    """
    Deletes a resume document by ID from the database.
    """
    result = await db.execute(select(ResumeModel).where(ResumeModel.id == resume_id))
    record = result.scalar_one_or_none()
    if not record:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    await db.delete(record)
    await db.commit()
    return {"success": True, "message": "Resume deleted successfully"}
