# ResumePro – ATS-Optimized Resume Builder

ResumePro is a modern, ATS-optimized Resume Builder web application inspired by the Google Stitch *"Technical Authority"* design blueprint. It empowers software engineers and tech professionals to design, customize, auto-parse documents (`.pdf` / `.docx`), preview in real-time, and export recruiter-ready resumes.

---

## ✨ Key Features

- **Google Stitch Design**: Sleek Technical Authority aesthetic with Deep Teal (`#00685f`), Tech Blue (`#0051d5`), and responsive layouts.
- **Dual-Pane Live Editor**: Keystroke-reactive live preview with zoom controls (50% to 150%) and accordion form sections.
- **Smart Parsing & Extraction**: Automatic heuristic parsing for PDF (`pypdf`/`pdfplumber`) and Word (`python-docx`) resumes into structured fields.
- **Curated Templates**: Technical Authority & Modern Executive layouts with custom accent color palettes.
- **Multi-Format Export**: Native Microsoft Word (`.docx`) backend builder and high-fidelity client-side PDF/Print generation.
- **Passwordless OTP Authentication**: JWT-based session management with demo 1-click access.
- **Auto-Save & Local Drafts**: Never lose progress with real-time browser persistence.

---

## 🏗️ Architecture & Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Vanilla CSS Design System, jsPDF, Lucide Icons |
| **Backend** | Python 3.9+, FastAPI, Uvicorn, Pydantic |
| **Document Processing** | `pypdf`, `pdfplumber`, `python-docx` |
| **Styling & Fonts** | CSS Custom Properties, Google Fonts (*Hanken Grotesk*, *Source Sans 3*, *JetBrains Mono*) |

---

## 🚀 Quick Start

### 1. Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
- Interactive API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### 2. Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```
- Web Application: [http://localhost:5173](http://localhost:5173)

---

## 📄 License

MIT License
