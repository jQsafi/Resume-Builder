import json
import os
from datetime import datetime
from typing import Optional, Dict, Any

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data")
USERS_FILE = os.path.join(DATA_DIR, "users.json")

def _ensure_data_dir():
    os.makedirs(DATA_DIR, exist_ok=True)
    if not os.path.exists(USERS_FILE):
        with open(USERS_FILE, "w", encoding="utf-8") as f:
            json.dump({}, f, indent=2)

def _load_users() -> Dict[str, Any]:
    _ensure_data_dir()
    try:
        with open(USERS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}

def _save_users(users: Dict[str, Any]):
    _ensure_data_dir()
    try:
        with open(USERS_FILE, "w", encoding="utf-8") as f:
            json.dump(users, f, indent=2)
    except Exception as e:
        print(f"[UserService] Error saving users: {e}")

def get_user_by_email(email: str) -> Optional[Dict[str, Any]]:
    users = _load_users()
    return users.get(email.lower().strip())

def create_or_authenticate_user(email: str, name: str = "") -> tuple[Dict[str, Any], bool]:
    """
    Returns (user_dict, is_new_user)
    """
    normalized_email = email.lower().strip()
    users = _load_users()
    
    if normalized_email in users:
        # Existing user
        user = users[normalized_email]
        user["last_login"] = datetime.utcnow().isoformat()
        users[normalized_email] = user
        _save_users(users)
        return user, False

    # New user creation
    derived_name = name.strip() if name and name.strip() else normalized_email.split('@')[0].replace('.', ' ').title()
    avatar = "".join([part[0] for part in derived_name.split() if part])[:2].upper() or "US"
    user_id = f"usr-{abs(hash(normalized_email)) % 1000000:06d}"
    
    new_user = {
        "id": user_id,
        "email": normalized_email,
        "name": derived_name,
        "avatar": avatar,
        "created_at": datetime.utcnow().isoformat(),
        "last_login": datetime.utcnow().isoformat(),
        "has_completed_tutorial": False
    }
    
    users[normalized_email] = new_user
    _save_users(users)
    return new_user, True

def complete_user_tutorial(email: str) -> bool:
    normalized_email = email.lower().strip()
    users = _load_users()
    if normalized_email in users:
        users[normalized_email]["has_completed_tutorial"] = True
        _save_users(users)
        return True
    return False
