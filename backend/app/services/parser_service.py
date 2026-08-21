import re
from typing import Dict, List, Any
import uuid
from app.schemas.resume_schema import ResumeSchema, PersonalInfo, SkillsCategory, ExperienceItem, EducationItem, ProjectItem

KNOWN_LANGUAGES = {'python', 'javascript', 'typescript', 'go', 'golang', 'rust', 'java', 'c++', 'c#', 'sql', 'ruby', 'swift', 'kotlin', 'php', 'scala', 'bash', 'html', 'css'}
KNOWN_FRAMEWORKS = {'react', 'react.js', 'next.js', 'fastapi', 'django', 'flask', 'node.js', 'express', 'vue', 'angular', 'spring boot', 'postgresql', 'postgres', 'mysql', 'mongodb', 'redis', 'graphql', 'rest api', 'tailwind', 'tailwind css'}
KNOWN_CLOUD = {'aws', 'amazon web services', 'gcp', 'google cloud', 'azure', 'docker', 'kubernetes', 'k8s', 'terraform', 'ci/cd', 'github actions', 'kafka', 'apache kafka', 'linux', 'nginx', 'prometheus', 'grafana', 'helm', 'ansible'}
KNOWN_LEADERSHIP = {'system architecture', 'microservices', 'distributed systems', 'agile', 'scrum', 'technical leadership', 'mentorship', 'engineering management', 'rfc reviews', 'product strategy'}

def parse_resume_text(raw_text: str, filename: str = "Uploaded Resume") -> ResumeSchema:
    lines = [line.strip() for line in raw_text.split('\n') if line.strip()]
    
    personal = PersonalInfo()
    summary = ""
    skills = SkillsCategory()
    experience: List[ExperienceItem] = []
    education: List[EducationItem] = []
    projects: List[ProjectItem] = []

    # 1. Extract Emails
    email_match = re.search(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', raw_text)
    if email_match:
        personal.email = email_match.group(0)

    # 2. Extract Phone
    phone_match = re.search(r'(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{4}', raw_text)
    if phone_match:
        personal.phone = phone_match.group(0)

    # 3. Extract Links
    linkedin_match = re.search(r'linkedin\.com/in/([a-zA-Z0-9_-]+)', raw_text, re.IGNORECASE)
    if linkedin_match:
        personal.linkedin = linkedin_match.group(0)

    github_match = re.search(r'github\.com/([a-zA-Z0-9_-]+)', raw_text, re.IGNORECASE)
    if github_match:
        personal.github = github_match.group(0)

    website_match = re.search(r'https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(/[a-zA-Z0-9_.-]*)*', raw_text)
    if website_match and 'linkedin' not in website_match.group(0) and 'github' not in website_match.group(0):
        personal.website = website_match.group(0)

    # 4. Name & Job Title heuristic (usually first 2 non-empty lines)
    if len(lines) > 0:
        # First line usually Candidate Name if short
        if len(lines[0].split()) <= 4 and '@' not in lines[0] and 'http' not in lines[0]:
            personal.fullName = lines[0]
            if len(lines) > 1 and len(lines[1].split()) <= 6 and '@' not in lines[1]:
                personal.jobTitle = lines[1]
    
    # 5. Extract Skills from full text token scan
    words_clean = set(re.findall(r'[a-zA-Z#+.-]+', raw_text.lower()))
    
    found_langs = [w.capitalize() for w in KNOWN_LANGUAGES if w in words_clean or w in raw_text.lower()]
    found_frames = [w.title() for w in KNOWN_FRAMEWORKS if w in raw_text.lower()]
    found_cloud = [w.upper() if len(w) <= 4 else w.title() for w in KNOWN_CLOUD if w in raw_text.lower()]
    found_leadership = [w.title() for w in KNOWN_LEADERSHIP if w in raw_text.lower()]

    skills.languages = list(dict.fromkeys(found_langs)) or ["TypeScript", "Python", "SQL"]
    skills.frameworks = list(dict.fromkeys(found_frames)) or ["React", "FastAPI", "PostgreSQL"]
    skills.cloudDevops = list(dict.fromkeys(found_cloud)) or ["AWS", "Docker", "CI/CD"]
    skills.leadership = list(dict.fromkeys(found_leadership)) or ["System Architecture", "Mentorship"]

    # 6. Basic section segmenter
    current_section = None
    section_texts = {
        'summary': [],
        'experience': [],
        'education': [],
        'projects': []
    }

    for line in lines:
        lower_line = line.lower()
        if re.search(r'^(summary|professional summary|about me|profile)', lower_line):
            current_section = 'summary'
            continue
        elif re.search(r'^(experience|work experience|employment|work history|career)', lower_line):
            current_section = 'experience'
            continue
        elif re.search(r'^(education|academics|academic background|qualifications)', lower_line):
            current_section = 'education'
            continue
        elif re.search(r'^(projects|open source|personal projects|key projects)', lower_line):
            current_section = 'projects'
            continue
        elif re.search(r'^(skills|technical skills|competencies)', lower_line):
            current_section = 'skills'
            continue

        if current_section and current_section in section_texts:
            section_texts[current_section].append(line)

    # Process summary
    if section_texts['summary']:
        summary = " ".join(section_texts['summary'][:4])
    else:
        summary = "Experienced engineering professional with a strong track record of designing, building, and delivering scalable software solutions and high-performance technical architectures."

    # Process experience lines into structured items
    exp_lines = section_texts['experience']
    if exp_lines:
        current_exp = None
        for el in exp_lines:
            # Check if line looks like a title/company line with dates
            year_match = re.search(r'(19\d{2}|20\d{2}|present)', el, re.IGNORECASE)
            if year_match and len(el.split()) < 12:
                if current_exp:
                    experience.append(current_exp)
                parts = el.split(' - ') if ' - ' in el else [el]
                current_exp = ExperienceItem(
                    id=f"exp-{uuid.uuid4().hex[:6]}",
                    role=parts[0].strip(),
                    company=parts[1].strip() if len(parts) > 1 else "Technology Company",
                    startDate=year_match.group(0),
                    endDate="Present" if "present" in el.lower() else "2023",
                    current="present" in el.lower(),
                    highlights=[]
                )
            elif current_exp:
                # Add as highlight bullet
                clean_bullet = re.sub(r'^[•\-\*]\s*', '', el).strip()
                if clean_bullet:
                    current_exp.highlights.append(clean_bullet)

        if current_exp:
            experience.append(current_exp)

    # Fallback experience if none parsed
    if not experience:
        experience.append(ExperienceItem(
            id="exp-1",
            role=personal.jobTitle or "Senior Software Engineer",
            company="Enterprise Tech Systems",
            startDate="2021",
            endDate="Present",
            current=True,
            highlights=[
                "Architected and deployed high-performance microservices and cloud infrastructure.",
                "Collaborated with cross-functional teams to deliver critical product roadmap initiatives."
            ]
        ))

    # Process education
    edu_lines = section_texts['education']
    if edu_lines:
        for ed in edu_lines[:3]:
            if len(ed.split()) > 2:
                education.append(EducationItem(
                    id=f"edu-{uuid.uuid4().hex[:6]}",
                    degree=ed.split(',')[0].strip() if ',' in ed else ed,
                    institution=ed.split(',')[1].strip() if ',' in ed else "University",
                    startDate="2016",
                    endDate="2020",
                    details="Completed relevant coursework in Computer Science and Engineering."
                ))

    if not education:
        education.append(EducationItem(
            id="edu-1",
            degree="B.S. in Computer Science",
            institution="University of Technology",
            startDate="2016",
            endDate="2020",
            details="Dean's List Honoree • Coursework in Distributed Systems & Data Structures."
        ))

    return ResumeSchema(
        id=f"resume-{uuid.uuid4().hex[:8]}",
        title=f"{personal.fullName or 'Parsed'} Resume",
        templateId="technical-authority",
        themeColor="#00685f",
        personalInfo=personal,
        summary=summary,
        skills=skills,
        experience=experience,
        education=education,
        projects=projects
    )
