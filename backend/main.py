from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import init_db, AsyncSessionLocal
from app.services.user_service import migrate_legacy_json_users
from app.api.routes import parser, export, resume, auth, ai

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables
    await init_db()
    
    # Run legacy data migration
    async with AsyncSessionLocal() as session:
        await migrate_legacy_json_users(session)
        
    yield
    # Shutdown events if any

app = FastAPI(
    title="ResumePro Backend API",
    description="High-performance backend engine for resume parsing, document export, and data management.",
    version="1.0.0",
    lifespan=lifespan
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
app.include_router(ai.router)

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
