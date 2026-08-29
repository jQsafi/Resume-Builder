from fastapi import APIRouter, UploadFile, File, HTTPException
from app.schemas.resume_schema import ResumeSchema
from app.utils.pdf_extractor import extract_text_from_pdf
from app.utils.word_extractor import extract_text_from_docx
from app.services.ai_service import parse_resume_with_ai

router = APIRouter(prefix="/api/parse", tags=["Parser"])

@router.post("/file", response_model=ResumeSchema)
async def parse_resume_file(file: UploadFile = File(...)):
    """
    Parses an uploaded PDF or Word resume using Groq Cloud AI with fallback to heuristic parsing,
    and returns a structured JSON resume schema.
    """
    filename = file.filename or "resume"
    extension = filename.lower().split('.')[-1]

    if extension not in ['pdf', 'docx', 'doc']:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file format. Please upload a .pdf or .docx file."
        )

    file_bytes = await file.read()
    if not file_bytes:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")

    raw_text = ""
    if extension == 'pdf':
        raw_text = extract_text_from_pdf(file_bytes)
    elif extension in ['docx', 'doc']:
        try:
            raw_text = extract_text_from_docx(file_bytes)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to parse Word document: {str(e)}")

    if not raw_text.strip():
        raise HTTPException(
            status_code=422,
            detail="Could not extract readable text from the document. The file may be image-based or password-protected."
        )

    # Parse plain text into structured schema via AI
    parsed_resume_dict = await parse_resume_with_ai(raw_text, filename=filename)
    return parsed_resume_dict
