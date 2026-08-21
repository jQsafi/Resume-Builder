from typing import List, Optional, Dict
from pydantic import BaseModel, Field

class PersonalInfo(BaseModel):
    fullName: Optional[str] = ""
    jobTitle: Optional[str] = ""
    email: Optional[str] = ""
    phone: Optional[str] = ""
    location: Optional[str] = ""
    website: Optional[str] = ""
    linkedin: Optional[str] = ""
    github: Optional[str] = ""

class SkillsCategory(BaseModel):
    languages: List[str] = Field(default_factory=list)
    frameworks: List[str] = Field(default_factory=list)
    cloudDevops: List[str] = Field(default_factory=list)
    leadership: List[str] = Field(default_factory=list)

class ExperienceItem(BaseModel):
    id: Optional[str] = ""
    role: Optional[str] = ""
    company: Optional[str] = ""
    location: Optional[str] = ""
    startDate: Optional[str] = ""
    endDate: Optional[str] = ""
    current: Optional[bool] = False
    highlights: List[str] = Field(default_factory=list)

class EducationItem(BaseModel):
    id: Optional[str] = ""
    degree: Optional[str] = ""
    institution: Optional[str] = ""
    location: Optional[str] = ""
    startDate: Optional[str] = ""
    endDate: Optional[str] = ""
    details: Optional[str] = ""

class ProjectItem(BaseModel):
    id: Optional[str] = ""
    name: Optional[str] = ""
    techStack: Optional[str] = ""
    link: Optional[str] = ""
    description: Optional[str] = ""

class CertificationItem(BaseModel):
    id: Optional[str] = ""
    name: Optional[str] = ""
    issuer: Optional[str] = ""
    year: Optional[str] = ""

class ResumeSchema(BaseModel):
    id: Optional[str] = ""
    title: Optional[str] = "My Resume"
    lastModified: Optional[str] = ""
    templateId: Optional[str] = "technical-authority"
    themeColor: Optional[str] = "#00685f"
    fontScale: Optional[str] = "normal"
    personalInfo: PersonalInfo = Field(default_factory=PersonalInfo)
    summary: Optional[str] = ""
    skills: SkillsCategory = Field(default_factory=SkillsCategory)
    experience: List[ExperienceItem] = Field(default_factory=list)
    education: List[EducationItem] = Field(default_factory=list)
    projects: List[ProjectItem] = Field(default_factory=list)
    certifications: List[CertificationItem] = Field(default_factory=list)
