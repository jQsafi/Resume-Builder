import io
from typing import Optional
import pypdf

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Extracts raw plain text from PDF stream using pypdf and pdfplumber fallback.
    """
    text_content = []
    
    # Try pypdf first
    try:
        reader = pypdf.PdfReader(io.BytesIO(file_bytes))
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text_content.append(extracted)
    except Exception as e:
        print(f"pypdf extraction error: {e}")

    # If empty or short, try pdfplumber
    if not text_content or len("".join(text_content).strip()) < 50:
        try:
            import pdfplumber
            with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
                for page in pdf.pages:
                    extracted = page.extract_text()
                    if extracted:
                        text_content.append(extracted)
        except Exception as e:
            print(f"pdfplumber fallback error: {e}")

    return "\n\n".join(text_content)
