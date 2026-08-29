from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base

class ResumeModel(Base):
    __tablename__ = "resumes"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id", ondelete="CASCADE"), nullable=True, index=True)
    title = Column(String(255), default="My Resume", nullable=False)
    template_id = Column(String(64), default="technical-authority", nullable=False)
    theme_color = Column(String(32), default="#00685f", nullable=False)
    font_scale = Column(String(32), default="normal", nullable=False)
    data = Column(JSON, nullable=False, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    last_modified = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationship
    user = relationship("UserModel", back_populates="resumes")

    def to_schema_dict(self):
        """Converts model to dictionary matching ResumeSchema."""
        base_data = dict(self.data) if self.data else {}
        base_data.update({
            "id": self.id,
            "title": self.title or base_data.get("title", "My Resume"),
            "templateId": self.template_id or base_data.get("templateId", "technical-authority"),
            "themeColor": self.theme_color or base_data.get("themeColor", "#00685f"),
            "fontScale": self.font_scale or base_data.get("fontScale", "normal"),
            "lastModified": self.last_modified.isoformat() if self.last_modified else datetime.utcnow().isoformat()
        })
        return base_data
