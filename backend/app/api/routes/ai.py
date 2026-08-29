from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from app.services.ai_service import polish_bullet_point, generate_summary_ai

router = APIRouter(prefix="/api/ai", tags=["AI Intelligence Engine"])

class PolishBulletRequest(BaseModel):
    bullet: Optional[str] = Field("", description="Draft bullet point text to polish")
    role: Optional[str] = Field("", description="Target or position role context")
    company: Optional[str] = Field("", description="Company name context")
    tone: Optional[str] = Field("google_xyz", description="Styling tone formula")

class PolishVariation(BaseModel):
    type: Optional[str] = "metrics"
    title: Optional[str] = "High Impact"
    text: Optional[str] = ""
    breakdown: Optional[Dict[str, Any]] = None

class PolishBulletResponse(BaseModel):
    original: Optional[str] = ""
    polished: Optional[str] = ""
    variations: List[PolishVariation] = Field(default_factory=list)
    source: Optional[str] = "groq_api"
    error: Optional[str] = None

class SuggestSummaryRequest(BaseModel):
    role: Optional[str] = ""
    skills: Optional[List[str]] = Field(default_factory=list)
    years_exp: Optional[str] = "5+"

class SuggestSummaryResponse(BaseModel):
    summary: str
    source: Optional[str] = "groq_api"

@router.post("/polish-bullet", response_model=PolishBulletResponse)
async def polish_bullet(payload: PolishBulletRequest):
    """
    Polishes and rewrites a resume achievement bullet point using Google's XYZ Formula
    via ultra-fast Groq Llama 3.3 70B AI engine.
    """
    bullet_text = payload.bullet.strip() if payload.bullet else "Engineered scalable microservices and optimized system throughput."

    result = await polish_bullet_point(
        bullet=bullet_text,
        role=payload.role or "",
        company=payload.company or "",
        tone=payload.tone or "google_xyz"
    )

    return result

@router.post("/suggest-summary", response_model=SuggestSummaryResponse)
async def suggest_summary(payload: SuggestSummaryRequest):
    """
    Generates a personalized, ATS-optimized Executive Summary based on role and technical skills.
    """
    result = await generate_summary_ai(
        role=payload.role or "",
        skills=payload.skills or [],
        years_exp=payload.years_exp or "5+"
    )
    return result
