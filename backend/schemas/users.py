from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List


class UserCreate(BaseModel):
    """Schema for creating a new user"""
    username: str = Field(..., min_length=3, max_length=50, description="Username must be 3-50 characters")
    email: EmailStr = Field(..., description="Valid email address required")


class UserUpdate(BaseModel):
    """Schema for updating user information"""
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    email: Optional[EmailStr] = None


class UserResponse(BaseModel):
    """Schema for user response"""
    user_id: int
    username: str
    email: str

    class Config:
        from_attributes = True


class UserWithSessions(BaseModel):
    """Schema for user with their sessions"""
    user_id: int
    username: str
    email: str
    sessions: List['SessionResponse'] = []

    class Config:
        from_attributes = True
