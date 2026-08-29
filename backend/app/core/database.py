import os
from dotenv import load_dotenv
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase

# Load environment variables
load_dotenv()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./data/resumepro.db")

# Resolve relative SQLite path to absolute path based on backend directory
if "sqlite" in DATABASE_URL and "///." in DATABASE_URL:
    rel_path = DATABASE_URL.split("///.")[1]  # e.g. /data/resumepro.db
    abs_db_path = os.path.normpath(os.path.join(BASE_DIR, rel_path.lstrip("/\\")))
    os.makedirs(os.path.dirname(abs_db_path), exist_ok=True)
    DATABASE_URL = f"sqlite+aiosqlite:///{abs_db_path}"

# SQLAlchemy Async Engine
engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    future=True,
    pool_pre_ping=True
)

# Async Session Factory
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)

# Declarative Base for ORM Models
class Base(DeclarativeBase):
    pass

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    FastAPI dependency that yields an async database session per request.
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()

async def init_db():
    """
    Initializes database schema tables on application startup.
    """
    # Import models here to ensure they are registered with Base metadata
    from app.models import UserModel, ResumeModel
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print(f"✅ [Database] Initialized connected tables on: {DATABASE_URL.split('@')[-1] if '@' in DATABASE_URL else DATABASE_URL}")
