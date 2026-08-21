# Resume Builder – Project Requirements & Technical Specification

## 1. Project Overview
An automated and interactive Resume Builder web application that enables users to create, customize, auto-fill from existing files, preview in real-time, and download professional resumes in PDF and Word formats.

---

## 2. Core Functional Requirements

### 2.1 Template Selection
- Users can browse and select from a variety of curated, modern, and ATS-friendly resume templates.
- Changing templates dynamically adapts the current user data without data loss.

### 2.2 Resume Data Ingestion (Auto-Extraction)
- **File Upload**: Users can upload existing resume files in **PDF** (`.pdf`) or **Word** (`.docx`) format.
- **Automated Parsing**: The backend extracts key information (Personal Details, Summary, Work Experience, Education, Skills, Projects, Certifications, etc.) and auto-populates the form fields.
- **Skip Option**: Users can skip the file upload step and enter all information manually.

### 2.3 Manual Editing & Customization
- Intuitive form sections with add/remove/reorder capabilities (e.g., dynamic work experience entries, skill tags).
- Live validation for required fields (email, phone, dates, etc.).

### 2.4 Real-time Preview
- Dynamic, side-by-side or split-screen real-time preview of the selected template populated with user input.
- Instant visual feedback upon editing any section.

### 2.5 Export & Download
- Users can export and download their finalized resume in:
  - **PDF (`.pdf`)** (pixel-perfect vector layout)
  - **Word (`.docx`)** (editable formatted document)

### 2.6 Authentication & Persistence (Optional / Recommended)
- User registration and login (JWT-based auth) to save drafts, manage multiple resumes, and download previous versions.

---

## 3. Technical Specifications

| Layer | Technology |
|---|---|
| **Frontend** | React.js (Vite), Modern CSS / CSS Modules |
| **Backend** | Python FastAPI (Async API) |
| **Database** | PostgreSQL |
| **Parsing Libraries** | `pdfplumber` / `pypdf`, `python-docx` |
| **Generation Libraries** | `WeasyPrint` / `ReportLab` (PDF), `python-docx` (Word) |
| **ORM / DB Driver** | SQLAlchemy / asyncpg / Alembic |

---

## 4. Project Directory Structure

```text
resume-builder/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/         # Buttons, inputs, modals
│   │   │   ├── forms/          # Resume editor form sections
│   │   │   ├── preview/        # Resume live preview renderer
│   │   │   └── templates/      # Modular resume template designs
│   │   ├── pages/              # Home, Editor, Dashboard, Auth
│   │   ├── services/           # API clients & endpoints (Axios/Fetch)
│   │   ├── context/ / hooks/   # State management (resume data state)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   │       ├── auth.py          # User authentication endpoints
│   │   │       ├── resume.py        # Resume CRUD operations
│   │   │       ├── parser.py        # File upload & data extraction endpoints
│   │   │       └── export.py        # PDF and Word export endpoints
│   │   ├── core/
│   │   │   ├── config.py            # Environment settings & configs
│   │   │   └── security.py          # Password hashing, JWT tokens
│   │   ├── models/
│   │   │   ├── db_connection.py     # Database engine & session setup
│   │   │   ├── user.py              # User DB model
│   │   │   └── resume.py            # Resume DB model & JSON schemas
│   │   ├── schemas/                 # Pydantic schemas (Request/Response validation)
│   │   │   ├── user.py
│   │   │   └── resume.py
│   │   ├── services/                # Business logic layer
│   │   │   ├── auth_service.py
│   │   │   └── resume_service.py
│   │   └── utils/
│   │       ├── pdf_extractor.py     # PDF parsing logic
│   │       ├── word_extractor.py    # DOCX parsing logic
│   │       ├── pdf_generator.py     # PDF generation & rendering
│   │       └── word_generator.py    # DOCX template generation
│   ├── requirements.txt
│   └── main.py
│
└── requirement.md
```

---

## 5. Key API Endpoints

- **Auth**: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- **Parser**: `POST /api/parse/file` (accepts `.pdf` / `.docx`, returns parsed structured JSON)
- **Resume CRUD**:
  - `GET /api/resumes` (list all user resumes)
  - `POST /api/resumes` (save resume data)
  - `GET /api/resumes/{id}` (get specific resume)
  - `PUT /api/resumes/{id}` (update resume)
  - `DELETE /api/resumes/{id}` (delete resume)
- **Export**:
  - `POST /api/export/pdf` (returns downloadable `.pdf`)
  - `POST /api/export/docx` (returns downloadable `.docx`)

---

---

## 6. Design System & Prototype Specifications (from Stitch)
- **Google Stitch Project**: [https://stitch.withgoogle.com/projects/14998481090566741441](https://stitch.withgoogle.com/projects/14998481090566741441)
- **Theme Identity**: *"Technical Authority"* (Engineered for Modern Tech Professionals & Executive Leadership)

### 6.1 Design Tokens & Aesthetics
- **Color Palette**:
  - **Primary (Deep Teal)**: `#00685f` / `#0d9488` — Structural headers, bullet accents, brand highlights.
  - **Secondary (Tech Blue)**: `#0051d5` / `#2563eb` — Interactive elements, links, primary buttons.
  - **Neutral / Surfaces**: `#f7f9fb` / `#f8fafc` — Background fills for summary blocks & skill chips.
  - **Text / Body**: `#191c1e` (Charcoal) — High-contrast, soft readability.
  - **Borders & Dividers**: `#bcc9c6` / `#e2e8f0` — 1px subtle structure dividers.
- **Typography Hierarchy**:
  - **Headings (`name-lg`, `headline-md`)**: `Hanken Grotesk` (Bold, modern geometric header font).
  - **Body Text (`body-md`, `subhead-sm`)**: `Source Sans 3` (Optimized for dense multi-line reading).
  - **Tech Stack & Metadata (`label-mono`)**: `JetBrains Mono` (Coding tags, dates, categorical skill chips).
- **Shape Language**:
  - Soft `4px` (`0.25rem`) rounded corners for badges, skill chips, and summary containers.

### 6.2 Screen & Flow Breakdown
1. **Landing Page (`ResumePro - Home`)**: Hero banner, ATS compatibility callouts, feature highlights, direct CTA.
2. **Onboarding (`ResumePro - Welcome & Career Goals`)**: Quick role & experience level selector for smart template recommendation.
3. **Template Gallery (`ResumePro - Choose Template`)**: Filterable grid displaying template cards (Modern, Executive, Technical, Minimalist).
4. **Template Preview Modal (`ResumePro - Preview Modal`)**: Interactive popover to inspect sample resumes before selection.
5. **User Dashboard (`ResumePro - Dashboard`)**: Grid of saved resumes with draft statuses, last modified dates, and quick actions (edit, duplicate, delete).
6. **Dual-Pane Editor (`ResumePro - Editor`)**:
   - **Left Pane**: Step-by-step collapsible accordion form (Personal Info, Summary, Experience timeline, Categorized Skills, Education, Projects).
   - **Right Pane**: Real-time interactive A4 live paper preview with instant re-rendering.
7. **Export & Share (`ResumePro - Export & Share`)**: Export modal supporting PDF download, Word (`.docx`) download, and print.
8. **Principal Engineer CV Template**: Blueprint reference layout with 2-column categorized skills, left-aligned timeline, and executive summary callout.