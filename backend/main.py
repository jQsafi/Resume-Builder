from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import parser, export, resume, auth

app = FastAPI(
    title="ResumePro Backend API",
    description="High-performance backend engine for resume parsing, document export, and data management.",
    version="1.0.0"
)

# CORS Configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(parser.router)
app.include_router(export.router)
app.include_router(resume.router)
app.include_router(auth.router)

@app.get("/")
async def root():
    return {
        "service": "ResumePro API Engine",
        "status": "online",
        "docs": "/docs",
        "version": "1.0.0"
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}
