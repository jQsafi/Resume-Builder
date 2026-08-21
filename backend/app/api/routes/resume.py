from fastapi import APIRouter, HTTPException
from typing import List, Dict
import uuid
from datetime import datetime
from app.schemas.resume_schema import ResumeSchema

router = APIRouter(prefix="/api/resumes", tags=["Resumes"])

# In-memory storage with initial sample data
RESUME_STORE: Dict[str, ResumeSchema] = {}

@router.get("", response_model=List[ResumeSchema])
async def list_resumes():
    """Lists all saved resumes for current user."""
    return list(RESUME_STORE.values())

@router.post("", response_model=ResumeSchema)
async def create_or_save_resume(resume: ResumeSchema):
    """Saves or updates a resume document."""
    if not resume.id:
        resume.id = f"resume-{uuid.uuid4().hex[:8]}"
    resume.lastModified = datetime.utcnow().isoformat()
    RESUME_STORE[resume.id] = resume
    return resume

@router.get("/{resume_id}", response_model=ResumeSchema)
async def get_resume(resume_id: str):
    """Retrieves a specific resume by ID."""
    if resume_id not in RESUME_STORE:
        raise HTTPException(status_code=404, detail="Resume not found")
    return RESUME_STORE[resume_id]

@router.delete("/{resume_id}")
async def delete_resume(resume_id: str):
    """Deletes a resume by ID."""
    if resume_id in RESUME_STORE:
        del RESUME_STORE[resume_id]
        return {"success": True, "message": "Resume deleted"}
    raise HTTPException(status_code=404, detail="Resume not found")
