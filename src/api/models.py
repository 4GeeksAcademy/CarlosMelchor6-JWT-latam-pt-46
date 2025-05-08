from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(500), nullable=False)
    salt: Mapped[str] = mapped_column(String(500), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    # DiaryEntry RELATIONSHIP
    diary_entries: Mapped[List["DiaryEntry"]
                          ] = relationship(back_populates="user")

    def __init__(self, email, password, salt):
        self.email = email
        self.password_hash = password
        self.salt = salt
        self.is_active = True

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            "salt": self.salt
        }


class DiaryEntry(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    content: Mapped[str] = mapped_column(
        String(250), unique=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    mood: Mapped[str] = mapped_column(String(50), nullable=False)

    def __init__(self, created_at, content, title, mood, user_id):
        self.created_at = created_at
        self.content = content
        self.title = title
        self.mood = mood
        self.user_id = user_id

    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "created_at": self.created_at,
            "title": self.title,
            "mood": self.mood
        }

    # USER RELATIONSHIP
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship(back_populates="diary_entries")