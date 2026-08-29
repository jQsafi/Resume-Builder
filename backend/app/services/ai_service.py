import os
import json
import re
import httpx
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

    # If both LLM attempts fail, return instant heuristic polish
    fallback = _heuristic_polish(clean_bullet, role, company)
    return fallback

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
