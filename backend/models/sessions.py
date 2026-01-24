from sqlalchemy import Column, Integer, ForeignKey, String, Float, DateTime, Index
from database.database import Base

class Sessions(Base):
    __tablename__ = "sessions"

    session_id = Column(Integer, autoincrement=True, primarykey=True, index=True)
    user_id = Column(Integer, autoincrement=True, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    session_name = Column(String, nullable=False)
    description = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="sessions")
    data_points = relationship("DataPoint", back_populates="session", cascade="all, delete-orphan")


    __table_args__ = (
            Index("idx_sessions_user_id", "user_id"),
        )


