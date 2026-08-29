import os
import json
import re
import uuid
import httpx
from datetime import datetime
from typing import Dict, Any, List, Optional
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
DEFAULT_MODEL = "openai/gpt-oss-120b"
FALLBACK_MODEL = "openai/gpt-oss-20b"

POWER_VERBS = [
    "Spearheaded", "Architected", "Orchestrated", "Engineered", "Pioneered",
    "Streamlined", "Accelerated", "Optimized", "Scaled", "Revamped",
    "Designed", "Automated", "Delivered", "Overhauled", "Formulated"
]

def _heuristic_polish(bullet: str, role: str = "", company: str = "") -> Dict[str, Any]:
    """
    Robust local rule-based polisher implementing Google XYZ Formula.
    Used as an ultra-fast offline fallback.
    """
    clean = bullet.strip().rstrip(".").lstrip("•- ")
    if not clean:
        clean = "Engineered core backend microservices and improved system throughput"
    
    weak_prefixes = [
        r"^(i\s+)?(was\s+)?responsible\s+for\s+",
        r"^(i\s+)?helped\s+(to\s+|with\s+)",
        r"^(i\s+)?worked\s+on\s+",
        r"^(i\s+)?participated\s+in\s+",
        r"^(i\s+)?handled\s+",
        r"^(i\s+)?assisted\s+in\s+"
    ]
    for pattern in weak_prefixes:
        clean = re.sub(pattern, "", clean, flags=re.IGNORECASE).strip()
    
    if clean:
        clean = clean[0].upper() + clean[1:]
    
    if not any(clean.startswith(v) for v in POWER_VERBS):
        clean = f"Spearheaded {clean[0].lower() + clean[1:] if clean else 'key initiative'}"

    var_metrics = f"{clean}, boosting performance by 38% and reducing operational turnaround across high-throughput production workloads."
    var_tech = f"{clean}, implementing zero-downtime architecture and automated CI/CD validation pipelines."
    var_leader = f"{clean}, driving cross-functional alignment and mentoring 4+ engineers to accelerate project delivery by 2.5x."

    return {
        "original": bullet,
        "polished": var_metrics,
        "variations": [
            {
                "type": "metrics",
                "title": "Metrics & High Impact (Google XYZ)",
                "text": var_metrics,
                "breakdown": {
                    "accomplished_x": "Executed core technical enhancement and system optimization",
                    "measured_by_y": "38% performance gain & reduced latency",
                    "by_doing_z": "Architecting resilient system workflows"
                }
            },
            {
                "type": "technical",
                "title": "Technical Depth & Architecture",
                "text": var_tech,
                "breakdown": {
                    "accomplished_x": "Implemented production-grade resilient framework",
                    "measured_by_y": "Zero downtime & robust validation",
                    "by_doing_z": "Designing automated CI/CD and modular services"
                }
            },
            {
                "type": "leadership",
                "title": "Engineering Leadership & Ownership",
                "text": var_leader,
                "breakdown": {
                    "accomplished_x": "Led engineering execution and team coordination",
                    "measured_by_y": "2.5x accelerated release velocity",
                    "by_doing_z": "Mentoring peers and establishing clear technical standards"
                }
            }
        ],
        "source": "heuristic_engine"
    }

def _normalize_ai_response(data: dict, original_bullet: str, role: str, company: str) -> dict:
    """Ensures consistent, safe structure for AI response."""
    data["original"] = original_bullet
    
    type_titles = {
        "metrics": "Metrics & High Impact (Google XYZ)",
        "technical": "Technical Depth & Architecture",
        "leadership": "Engineering Leadership & Ownership"
    }

    raw_variations = data.get("variations", [])
    clean_variations = []

    for idx, v in enumerate(raw_variations):
        if isinstance(v, str):
            v_type = list(type_titles.keys())[idx % 3]
            clean_variations.append({
                "type": v_type,
                "title": type_titles[v_type],
                "text": v,
                "breakdown": None
            })
        elif isinstance(v, dict):
            v_type = v.get("type") or list(type_titles.keys())[idx % 3]
            v_title = v.get("title") or type_titles.get(v_type, "Enhanced Bullet")
            v_text = v.get("text") or v.get("bullet") or v.get("content") or data.get("polished") or original_bullet
            v_breakdown = v.get("breakdown")
            if not isinstance(v_breakdown, dict):
                v_breakdown = None
            clean_variations.append({
                "type": str(v_type),
                "title": str(v_title),
                "text": str(v_text),
                "breakdown": v_breakdown
            })

    # If fewer than 3 variations, augment from heuristic
    if len(clean_variations) < 3:
        h_data = _heuristic_polish(original_bullet, role, company)
        existing_types = {v["type"] for v in clean_variations}
        for hv in h_data.get("variations", []):
            if hv["type"] not in existing_types:
                clean_variations.append(hv)

    data["variations"] = clean_variations[:3]
    if not data.get("polished") and data["variations"]:
        data["polished"] = data["variations"][0]["text"]
    
    data["source"] = data.get("source") or "groq_api"
    return data

async def polish_bullet_point(bullet: str, role: str = "", company: str = "", tone: str = "google_xyz") -> Dict[str, Any]:
    """
    Polishes a resume bullet point using Groq Llama/GPT-OSS models via async HTTP calls.
    Follows Google's XYZ formula: Accomplished [X] as measured by [Y] by doing [Z].
    """
    clean_bullet = bullet.strip() if bullet else "Engineered high-performance cloud microservices and optimized API throughput."
    api_key = os.getenv("GROQ_API_KEY", GROQ_API_KEY)
    
    if not api_key or "your_groq_api_key" in api_key:
        return _heuristic_polish(clean_bullet, role, company)

    prompt = f"""
You are a Principal Technical Recruiter and Staff Engineering Resume Expert specializing in Google's "Accomplished [X] as measured by [Y] by doing [Z]" XYZ formula.

Target Role Context: {role or 'Senior Software Engineer / Tech Professional'}
Company / Context: {company or 'Technology Company'}
Draft Bullet Point to Polish: "{clean_bullet}"

Task:
Rewrite the draft bullet point into 3 distinct, compelling, ATS-optimized variations:
1. 'metrics': Focus on quantifiable metrics, latency reduction, scale, or business growth.
2. 'technical': Focus on architecture, technical depth, system resilience, and modern tech stack.
3. 'leadership': Focus on spearheading initiatives, mentoring engineers, and cross-functional alignment.

Respond ONLY with valid JSON in this exact structure:
{{
  "polished": "The best single polished bullet point matching Google XYZ formula",
  "variations": [
    {{
      "type": "metrics",
      "title": "Metrics & High Impact (Google XYZ)",
      "text": "Full rewritten bullet point with strong metrics...",
      "breakdown": {{
        "accomplished_x": "What was achieved",
        "measured_by_y": "Specific metric (e.g. 45% reduction in latency)",
        "by_doing_z": "How it was executed / technologies used"
      }}
    }},
    {{
      "type": "technical",
      "title": "Technical Depth & Architecture",
      "text": "Full rewritten bullet point emphasizing architecture and tools...",
      "breakdown": {{
        "accomplished_x": "What technical system was designed/built",
        "measured_by_y": "Reliability/scalability metric",
        "by_doing_z": "Deep technical implementation details"
      }}
    }},
    {{
      "type": "leadership",
      "title": "Engineering Leadership & Ownership",
      "text": "Full rewritten bullet point emphasizing leadership...",
      "breakdown": {{
        "accomplished_x": "Project/initiative led",
        "measured_by_y": "Team/velocity/business outcome",
        "by_doing_z": "Cross-functional leadership and mentorship"
      }}
    }}
  ]
}}
"""

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    # Try Primary Model (openai/gpt-oss-120b) with generous max_tokens
    for model_name in [DEFAULT_MODEL, FALLBACK_MODEL]:
        payload = {
            "model": model_name,
            "messages": [
                {"role": "system", "content": "You are an ATS resume optimization engine. Return only parseable JSON."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.3,
            "max_tokens": 2048,
            "response_format": {"type": "json_object"}
        }

        try:
            async with httpx.AsyncClient(timeout=20.0) as client:
                resp = await client.post(GROQ_API_URL, headers=headers, json=payload)
                if resp.status_code == 200:
                    data_json = resp.json()
                    content = data_json["choices"][0]["message"]["content"].strip()
                    data = json.loads(content)
                    return _normalize_ai_response(data, clean_bullet, role, company)
                else:
                    print(f"[AIService] Groq model {model_name} returned status {resp.status_code}: {resp.text}")
        except Exception as e:
            print(f"[AIService] Groq error on {model_name}: {e}")

    # Fallback to instant rule-based engine
    return _heuristic_polish(clean_bullet, role, company)

async def generate_summary_ai(role: str = "", skills: List[str] = None, years_exp: str = "5+") -> Dict[str, Any]:
    """
    Generates a high-impact executive summary using Groq LLM via async HTTP calls.
    """
    api_key = os.getenv("GROQ_API_KEY", GROQ_API_KEY)
    skills_str = ", ".join(skills) if skills else "Distributed Systems, Cloud Architecture, Full-Stack Engineering, CI/CD"
    
    if not api_key or "your_groq_api_key" in api_key:
        return {
            "summary": f"High-impact {role or 'Principal Software Engineer'} with {years_exp} years of proven expertise in {skills_str}. Adept at designing resilient, scalable architectures and steering high-performance engineering teams to deliver mission-critical technical solutions.",
            "source": "fallback"
        }

    prompt = f"""
Write a powerful 3-sentence Executive Resume Summary for a {role or 'Senior Tech Professional'} with expertise in: {skills_str}.
Keep it concise, active, authoritative, and ATS-optimized without cliché fluff.

Respond ONLY with valid JSON:
{{
  "summary": "3-sentence executive summary..."
}}
"""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    for model_name in [DEFAULT_MODEL, FALLBACK_MODEL]:
        payload = {
            "model": model_name,
            "messages": [
                {"role": "system", "content": "You are an executive resume writer. Output only valid JSON."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.4,
            "max_tokens": 800,
            "response_format": {"type": "json_object"}
        }

        try:
            async with httpx.AsyncClient(timeout=20.0) as client:
                resp = await client.post(GROQ_API_URL, headers=headers, json=payload)
                if resp.status_code == 200:
                    data_json = resp.json()
                    content = data_json["choices"][0]["message"]["content"].strip()
                    data = json.loads(content)
                    data["source"] = "groq_api"
                    return data
        except Exception as e:
            print(f"[AIService] Summary error on {model_name}: {e}")

    return {
        "summary": f"High-impact {role or 'Principal Software Engineer'} with {years_exp} years of proven expertise in {skills_str}. Adept at designing resilient, scalable architectures and steering high-performance engineering teams to deliver mission-critical technical solutions.",
        "source": "fallback"
    }

def _sanitize_ai_parsed_resume(data: dict, filename: str) -> dict:
    """Sanitizes and normalizes the AI-parsed resume into a strict ResumeSchema structure."""
    clean_title = filename.replace('.pdf', '').replace('.docx', '').replace('.doc', '').replace('_', ' ').replace('-', ' ').title()
    
    res = {
        "id": f"resume-{int(datetime.utcnow().timestamp() * 1000)}",
        "title": data.get("title") or clean_title or "Uploaded Resume",
        "lastModified": datetime.utcnow().isoformat(),
        "templateId": "technical-authority",
        "themeColor": "#00685f",
        "fontScale": "normal",
        "personalInfo": {
            "fullName": "",
            "jobTitle": "",
            "email": "",
            "phone": "",
            "location": "",
            "website": "",
            "linkedin": "",
            "github": ""
        },
        "summary": "",
        "skills": {
            "languages": [],
            "frameworks": [],
            "cloudDevops": [],
            "leadership": []
        },
        "experience": [],
        "education": [],
        "projects": [],
        "certifications": []
    }

    # 1. Personal Info
    p_info = data.get("personalInfo", {})
    if isinstance(p_info, dict):
        for k in res["personalInfo"]:
            res["personalInfo"][k] = str(p_info.get(k) or "").strip()

    # 2. Summary
    res["summary"] = str(data.get("summary") or "").strip()

    # 3. Skills
    skills_in = data.get("skills", {})
    if isinstance(skills_in, dict):
        for cat in ["languages", "frameworks", "cloudDevops", "leadership"]:
            items = skills_in.get(cat, [])
            if isinstance(items, list):
                res["skills"][cat] = [str(x).strip() for x in items if x and str(x).strip()]

    # 4. Experience
    exp_in = data.get("experience", [])
    if isinstance(exp_in, list):
        for item in exp_in:
            if isinstance(item, dict):
                raw_highlights = item.get("highlights", [])
                highlights = [str(h).strip() for h in raw_highlights if h and str(h).strip()] if isinstance(raw_highlights, list) else []
                res["experience"].append({
                    "id": item.get("id") or f"exp-{uuid.uuid4().hex[:8]}",
                    "role": str(item.get("role") or "").strip(),
                    "company": str(item.get("company") or "").strip(),
                    "location": str(item.get("location") or "").strip(),
                    "startDate": str(item.get("startDate") or "").strip(),
                    "endDate": str(item.get("endDate") or "").strip(),
                    "current": bool(item.get("current", False)),
                    "highlights": highlights
                })

    # 5. Education
    edu_in = data.get("education", [])
    if isinstance(edu_in, list):
        for item in edu_in:
            if isinstance(item, dict):
                res["education"].append({
                    "id": item.get("id") or f"edu-{uuid.uuid4().hex[:8]}",
                    "degree": str(item.get("degree") or "").strip(),
                    "institution": str(item.get("institution") or "").strip(),
                    "location": str(item.get("location") or "").strip(),
                    "startDate": str(item.get("startDate") or "").strip(),
                    "endDate": str(item.get("endDate") or "").strip(),
                    "details": str(item.get("details") or "").strip()
                })

    # 6. Projects
    proj_in = data.get("projects", [])
    if isinstance(proj_in, list):
        for item in proj_in:
            if isinstance(item, dict):
                res["projects"].append({
                    "id": item.get("id") or f"proj-{uuid.uuid4().hex[:8]}",
                    "name": str(item.get("name") or "").strip(),
                    "techStack": str(item.get("techStack") or "").strip(),
                    "link": str(item.get("link") or "").strip(),
                    "description": str(item.get("description") or "").strip()
                })

    # 7. Certifications
    cert_in = data.get("certifications", [])
    if isinstance(cert_in, list):
        for item in cert_in:
            if isinstance(item, dict):
                res["certifications"].append({
                    "id": item.get("id") or f"cert-{uuid.uuid4().hex[:8]}",
                    "name": str(item.get("name") or "").strip(),
                    "issuer": str(item.get("issuer") or "").strip(),
                    "year": str(item.get("year") or "").strip()
                })

    return res

async def parse_resume_with_ai(raw_text: str, filename: str = "Uploaded Resume") -> Dict[str, Any]:
    """
    Parses and categorizes document raw text into a complete ResumeSchema JSON structure
    using Groq Cloud LLM with automated fallback to the heuristic parser.
    """
    from app.services.parser_service import parse_resume_text

    api_key = os.getenv("GROQ_API_KEY", GROQ_API_KEY)
    if not api_key or "your_groq_api_key" in api_key:
        print("[AIService] No Groq API key found. Using heuristic parser.")
        return parse_resume_text(raw_text, filename).dict()

    prompt = f"""
You are an expert ATS Resume Intelligence System.
Analyze the following extracted text from a candidate's uploaded resume document ("{filename}") and extract all information with maximum accuracy.

Document Text:
\"\"\"
{raw_text[:7500]}
\"\"\"

Instructions:
1. Extract candidate personal info (fullName, jobTitle, email, phone, location, website, linkedin, github).
2. Extract or formulate a concise, authoritative 2-4 sentence executive summary.
3. Classify technical skills into 4 distinct arrays:
   - languages (e.g. Python, TypeScript, Go, Java, C++, SQL, Rust...)
   - frameworks (e.g. React, FastAPI, Node.js, Next.js, Django, PostgreSQL, Redis, GraphQL...)
   - cloudDevops (e.g. AWS, GCP, Docker, Kubernetes, Terraform, CI/CD, Kafka, Linux...)
   - leadership (e.g. System Architecture, Agile, Microservices, Technical Mentorship...)
4. Extract all work history items chronologically with: role, company, location, startDate, endDate, current (bool), and highlights (array of clear, impactful achievement bullet points).
5. Extract education items with: degree, institution, location, startDate, endDate, details.
6. Extract projects with: name, techStack, link, description.
7. Extract certifications with: name, issuer, year.

Respond ONLY with valid JSON in this exact structure:
{{
  "title": "{filename.replace('.pdf', '').replace('.docx', '').title()}",
  "personalInfo": {{
    "fullName": "Candidate Name",
    "jobTitle": "Job Title",
    "email": "email@example.com",
    "phone": "+1 234 567 890",
    "location": "City, State / Country",
    "website": "portfolio.com",
    "linkedin": "linkedin.com/in/username",
    "github": "github.com/username"
  }},
  "summary": "Executive summary text...",
  "skills": {{
    "languages": ["Python", "TypeScript"],
    "frameworks": ["React", "FastAPI"],
    "cloudDevops": ["AWS", "Docker"],
    "leadership": ["System Architecture"]
  }},
  "experience": [
    {{
      "role": "Role Title",
      "company": "Company Name",
      "location": "City, State",
      "startDate": "2021",
      "endDate": "Present",
      "current": true,
      "highlights": [
        "Achieved X by implementing Y resulting in Z."
      ]
    }}
  ],
  "education": [
    {{
      "degree": "B.S. in Computer Science",
      "institution": "University Name",
      "location": "City, State",
      "startDate": "2016",
      "endDate": "2020",
      "details": "Graduated Magna Cum Laude"
    }}
  ],
  "projects": [
    {{
      "name": "Project Name",
      "techStack": "React, FastAPI, Docker",
      "link": "https://project.com",
      "description": "Project overview..."
    }}
  ],
  "certifications": [
    {{
      "name": "AWS Certified Solutions Architect",
      "issuer": "Amazon Web Services",
      "year": "2023"
    }}
  ]
}}
"""

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    for model_name in [DEFAULT_MODEL, FALLBACK_MODEL]:
        payload = {
            "model": model_name,
            "messages": [
                {"role": "system", "content": "You are a master ATS resume parsing system. Return only valid, parseable JSON."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.2,
            "max_tokens": 2500,
            "response_format": {"type": "json_object"}
        }

        try:
            async with httpx.AsyncClient(timeout=25.0) as client:
                resp = await client.post(GROQ_API_URL, headers=headers, json=payload)
                if resp.status_code == 200:
                    data_json = resp.json()
                    content = data_json["choices"][0]["message"]["content"].strip()
                    parsed_dict = json.loads(content)
                    sanitized = _sanitize_ai_parsed_resume(parsed_dict, filename)
                    print(f"[AIService] Successfully parsed {filename} with AI model {model_name}")
                    return sanitized
                else:
                    print(f"[AIService] Groq model {model_name} parsing failed with status {resp.status_code}: {resp.text}")
        except Exception as e:
            print(f"[AIService] Groq error on parsing with {model_name}: {e}")

    # Fallback to local heuristic parser
    print(f"[AIService] Falling back to local heuristic parser for {filename}")
    return parse_resume_text(raw_text, filename).dict()
