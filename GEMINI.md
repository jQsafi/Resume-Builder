# ResumePro – Project Status & Roadmap (GEMINI.md)

## 📌 Project Overview
**ResumePro** is an automated, ATS-optimized Resume Builder web application inspired by the Google Stitch *"Technical Authority"* design blueprint. It enables tech professionals and engineers to build, customize, auto-parse from existing documents (`.pdf` / `.docx`), preview in real-time with pixel-perfect precision, and export high-quality resumes.

---

## 🏗️ Tech Stack

| Component | Technology | Role |
|---|---|---|
| **Frontend** | React 18 (Vite), Modern CSS | UI, live dual-pane workspace, state management, client export |
| **Backend** | Python 3.9+, FastAPI, Uvicorn | Async REST API, document parser, document generator |
| **Parsing** | `pypdf`, `pdfplumber`, `python-docx` | Text extraction & heuristic section categorization |
| **Exporting** | `python-docx`, `jsPDF`, `html2canvas` | Native Word (.docx) & Vector PDF exports |
| **Design** | Google Stitch ("Technical Authority") | Deep Teal `#00685f`, Tech Blue `#0051d5`, Hanken Grotesk & JetBrains Mono |

---

## ✅ DONE LIST

### 🎨 Frontend & Design System
- [x] **Google Stitch Design Tokens**: Configured CSS custom properties for Deep Teal (`#00685f`), Tech Blue (`#0051d5`), and Slate background surfaces.
- [x] **Typography Setup**: Google Fonts integrated (`Hanken Grotesk` headings, `Source Sans 3` body, `JetBrains Mono` tech tags).
- [x] **Dual Header & Footer Architecture**:
  - [x] **Logged-Out Header & Footer**: Public navigation matching Stitch with rich multi-column footer and system status indicator.
  - [x] **Logged-In Header & Footer**: In-app workspace header with zoom controls, template picker, export CTA, user avatar menu, and autosave status strip.
- [x] **Home Landing Page (`HomePage.jsx`)**:
  - [x] 3D floating perspective interactive resume preview card with live ATS score metrics.
  - [x] Social proof company validation strip (*Google, Meta, Amazon, Netflix, Stripe*).
  - [x] 3 Core feature pillar cards (Recruiter-Approved Layouts, Auto-Extraction, Instant Export).
  - [x] Curated Precision Templates showcase.
  - [x] 3-Step "How It Works" onboarding guide.
- [x] **Dual-Pane Interactive Editor (`EditorPage.jsx`)**:
  - [x] **Left Pane Accordion Forms**: Personal Info, Executive Summary (with auto-suggest helper), Categorized Skills (Languages, Frameworks, Cloud, Leadership), Work History with dynamic achievement bullets, Education, and Projects.
  - [x] **Right Pane Live Preview (`ResumePreview.jsx`)**: A4 paper proportions with zoom scaling (`50%` to `150%`) and keystroke-reactive live re-rendering.
- [x] **Templates Engine**:
  - [x] **Technical Authority Template**: 2-column skills matrix, left-aligned timeline, and monospace tags.
  - [x] **Modern Executive Template**: Clean top-banner executive layout.
  - [x] **Template & Accent Color Switcher Modal (`TemplateModal.jsx`)**.
- [x] **Templates Catalog Page (`TemplatesPage.jsx`)** and **Dashboard Page (`DashboardPage.jsx`)**.
- [x] **Export Modal (`ExportModal.jsx`)**: Client-side high-res PDF generation, browser print dialog, and JSON data backup.
- [x] **Passwordless Email + OTP $\rightarrow$ JWT Authentication Flow**:
  - [x] 2-Step interactive OTP Modal (`AuthModal.jsx`) with 6-digit box auto-tabbing, resend countdown timer, and 1-Click Demo.
  - [x] Secure signed HS256 JWT Token issuance & `localStorage` session persistence.
  - [x] Authenticated Header & Footer workspace switching.
- [x] **Local Storage Persistence**: Real-time auto-saving of drafts in `localStorage`.

### ⚡ Backend & Processing Engine
- [x] **FastAPI Application Setup (`backend/`)**:
  - [x] Async REST API with OpenAPI Swagger UI at `http://localhost:8000/docs`.
  - [x] CORS middleware configured for Vite React frontend (`http://localhost:5173`).
- [x] **Pydantic Schemas (`resume_schema.py`)**: Strict data contract matching frontend state schema.
- [x] **Automated Resume File Extraction Pipeline (`POST /api/parse/file`)**:
  - [x] Multi-column PDF parsing via `pypdf` with `pdfplumber` fallback.
  - [x] Native Word document parsing via `python-docx`.
  - [x] Heuristic regex & pattern extractor for emails, phone numbers, LinkedIn/GitHub links, categorized technical skill tags, job timeline, and education.
- [x] **Native Word Export Engine (`POST /api/export/docx`)**:
  - [x] Programmatic `.docx` builder with Deep Teal headings, categorized skills, and bulleted work history.
- [x] **Frontend-Backend Integration**:
  - [x] `frontend/src/services/api.js` API client.
  - [x] Integrated *"Upload PDF/Word"* button in editor with loading spinners and real-time form autofill.
  - [x] Integrated *"Download .DOCX"* button in export modal streaming backend-generated Word files.

- [x] **PostgreSQL & SQLAlchemy Database Persistence Engine**:
  - [x] Async SQLAlchemy 2.0 engine with PostgreSQL (`asyncpg`) and SQLite (`aiosqlite`) support.
  - [x] ORM Models for `UserModel` and `ResumeModel` with automated table creation on startup.
  - [x] Persistent user accounts, JWT sessions, and full resume document CRUD via async database sessions.
  - [x] Automatic legacy JSON migration loader (`data/users.json` -> DB).
  - [x] Environment configuration (`.env` and `.env.example`).

- [x] **AI-Powered PDF & DOCX Resume Upload Parser (Groq Cloud LLM)**:
  - [x] Full-text extraction pipeline for PDF (`pypdf`, `pdfplumber`) and DOCX (`python-docx`).
  - [x] Intelligent Groq LLM parsing (`openai/gpt-oss-120b` with multi-model fallback) extracting contact details, classified skills matrix, chronological work history with Google XYZ bullets, education, and projects.
  - [x] Seamless fallback to heuristic regex parser if offline or API key missing.
  - [x] Integrated frontend upload with live `"✨ AI Extracting..."` spinners and instant form autofill.

- [x] **AI-Powered Bullet Point Polisher & Executive Summary Engine (Groq Cloud LLM)**:
  - [x] High-speed Groq LLM integration (`openai/gpt-oss-120b`) with automated fallback engine.
  - [x] Google XYZ formula transformer (*"Accomplished [X] as measured by [Y] by doing [Z]"*).
  - [x] 3 Tailored angles per bullet (*Metrics & High Impact*, *Technical Depth*, *Engineering Leadership*).
  - [x] Interactive `AiPolishModal.jsx` in frontend with 1-click preview and state application.
  - [x] Executive Summary AI generator button in `SummaryForm.jsx`.

---

## 📋 TODO LIST (Upcoming Enhancements)

### 🚀 Phase 3: Advanced Intelligence & Feature Enhancements
- [ ] **Real-Time ATS Keyword Matcher**:
  - [ ] Allow users to paste a Target Job Description and calculate a live ATS Match Score (%) with suggested missing keywords.
- [ ] **Server-Side PDF Vector Rendering**:
  - [ ] Integrate `WeasyPrint` or headless Chromium service for server-side vector PDF downloads matching browser print quality.
- [ ] **Additional Resume Templates**:
  - [ ] Minimalist Academic CV template.
  - [ ] Creative Tech / Designer template.
- [ ] **Cover Letter Generator**:
  - [ ] Match selected resume template style to generate an accompanying ATS-aligned cover letter.

---

## 🛠️ Quick Start & Running Locally

### 1. Start FastAPI Backend:
```bash
cd backend
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
- API Docs: `http://localhost:8000/docs`

### 2. Start Vite Frontend:
```bash
cd frontend
npm run dev
```
- Web Application: `http://localhost:5173`
