import json
import os
from datetime import datetime
from typing import Optional, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import UserModel

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data")
USERS_FILE = os.path.join(DATA_DIR, "users.json")

async def migrate_legacy_json_users(db: AsyncSession):
    """
    Imports legacy users.json records into the connected database if not already present.
    """
    if not os.path.exists(USERS_FILE):
        return
    try:
        with open(USERS_FILE, "r", encoding="utf-8") as f:
            legacy_users = json.load(f)
        for email, udata in legacy_users.items():
            norm_email = email.lower().strip()
            result = await db.execute(select(UserModel).where(UserModel.email == norm_email))
            existing = result.scalar_one_or_none()
            if not existing:
                new_user = UserModel(
                    id=udata.get("id", f"usr-{abs(hash(norm_email)) % 1000000:06d}"),
                    email=norm_email,
                    name=udata.get("name", ""),
                    avatar=udata.get("avatar", "US"),
                    has_completed_tutorial=udata.get("has_completed_tutorial", False),
                    created_at=datetime.fromisoformat(udata["created_at"]) if udata.get("created_at") else datetime.utcnow(),
                    last_login=datetime.fromisoformat(udata["last_login"]) if udata.get("last_login") else datetime.utcnow()
                )
                db.add(new_user)
        await db.commit()
    except Exception as e:
        print(f"[UserService] Legacy migration note: {e}")

async def get_user_by_email(db: AsyncSession, email: str) -> Optional[Dict[str, Any]]:
    """Retrieves a user by email address from the database."""
    normalized_email = email.lower().strip()
    result = await db.execute(select(UserModel).where(UserModel.email == normalized_email))
    user = result.scalar_one_or_none()
    if user:
        return user.to_dict()
    return None

async def create_or_authenticate_user(db: AsyncSession, email: str, name: str = "") -> tuple[Dict[str, Any], bool]:
    """
    Finds or creates a user in the database.
    Returns (user_dict, is_new_user).
    """
    normalized_email = email.lower().strip()
    result = await db.execute(select(UserModel).where(UserModel.email == normalized_email))
    user = result.scalar_one_or_none()
    
    if user:
        # Existing user
        user.last_login = datetime.utcnow()
        if name and name.strip() and not user.name:
            user.name = name.strip()
        await db.commit()
        await db.refresh(user)
        return user.to_dict(), False

    # New user creation
    derived_name = name.strip() if name and name.strip() else normalized_email.split('@')[0].replace('.', ' ').title()
    avatar = "".join([part[0] for part in derived_name.split() if part])[:2].upper() or "US"
    user_id = f"usr-{abs(hash(normalized_email)) % 1000000:06d}"

    new_user = UserModel(
        id=user_id,
        email=normalized_email,
        name=derived_name,
        avatar=avatar,
        has_completed_tutorial=False,
        created_at=datetime.utcnow(),
        last_login=datetime.utcnow()
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user.to_dict(), True

async def complete_user_tutorial(db: AsyncSession, email: str) -> bool:
    """Marks user tutorial completion in the database."""
    normalized_email = email.lower().strip()
    result = await db.execute(select(UserModel).where(UserModel.email == normalized_email))
    user = result.scalar_one_or_none()
    if user:
        user.has_completed_tutorial = True
        await db.commit()
        return True
    return False
