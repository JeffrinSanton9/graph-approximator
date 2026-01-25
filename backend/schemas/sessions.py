from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class SessionCreate(BaseModel):
    """Schema for creating a new session"""
    user_id: int = Field(..., description="User ID who owns this session")
    session_name: str = Field(..., min_length=1, max_length=100, description="Name of the session")
    description: Optional[str] = Field(None, max_length=500, description="Optional session description")


class SessionUpdate(BaseModel):
    """Schema for updating session information"""
    session_name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)


class SessionResponse(BaseModel):
    """Schema for session response"""
    session_id: int
    user_id: int
    session_name: str
    description: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class SessionWithDatapoints(BaseModel):
    """Schema for session with its data points"""
    session_id: int
    user_id: int
    session_name: str
    description: Optional[str]
    created_at: datetime
    updated_at: datetime
    data_points: List['DatapointResponse'] = []

    class Config:
        from_attributes = True


class SessionApproximationResponse(BaseModel):
    """Schema for approximation response"""
    session_id: int
    session_name: str
    data_points_count: int
    approximation: str = Field(..., description="The approximated function as a string")
    confidence: Optional[float] = Field(None, description="Confidence score of the approximation (0-1)")
    
    class Config:
        from_attributes = True
