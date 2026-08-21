from fastapi import APIRouter, Response, HTTPException
from app.schemas.resume_schema import ResumeSchema
from app.services.export_service import generate_docx_resume

router = APIRouter(prefix="/api/export", tags=["Export"])

@router.post("/docx")
async def export_resume_docx(resume: ResumeSchema):
    """
    Generates a formatted Microsoft Word (.docx) resume from structured JSON data.
    """
    try:
        docx_bytes = generate_docx_resume(resume)
        filename = f"{(resume.personalInfo.fullName or 'Resume').replace(' ', '_')}_CV.docx"
        
        return Response(
            content=docx_bytes,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={
                "Content-Disposition": f'attachment; filename="{filename}"'
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate Word document: {str(e)}")
