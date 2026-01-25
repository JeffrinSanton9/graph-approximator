from sqlalchemy import Column, Integer, ForeignKey, Float, Index, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database.database import Base


class Datapoints(Base):
    __tablename__ = "data_points"

    point_id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(Integer, ForeignKey("sessions.session_id", ondelete="CASCADE"), nullable=False)
    x_value = Column(Float, nullable=False)
    y_value = Column(Float, nullable=False)
    
    # Use string reference to avoid circular imports
    session = relationship("Sessions", back_populates="data_points")
    
    __table_args__ = (
        Index("idx_data_points_session_id", "session_id"),
    )
