from pydantic import BaseModel, Field
from typing import Optional, List


class DatapointCreate(BaseModel):
    """Schema for creating a new datapoint"""
    session_id: int = Field(..., description="Session ID this datapoint belongs to")
    x_value: float = Field(..., description="X coordinate value")
    y_value: float = Field(..., description="Y coordinate value")


class DatapointUpdate(BaseModel):
    """Schema for updating a datapoint"""
    x_value: Optional[float] = Field(None, description="X coordinate value")
    y_value: Optional[float] = Field(None, description="Y coordinate value")


class DatapointResponse(BaseModel):
    """Schema for datapoint response"""
    point_id: int
    session_id: int
    x_value: float
    y_value: float

    class Config:
        from_attributes = True


class DatapointBatch(BaseModel):
    """Schema for creating multiple datapoints at once"""
    session_id: int = Field(..., description="Session ID these datapoints belong to")
    data_points: List[dict] = Field(..., description="List of {x_value, y_value} pairs")

    class Config:
        schema_extra = {
            "example": {
                "session_id": 1,
                "data_points": [
                    {"x_value": 1.0, "y_value": 2.5},
                    {"x_value": 2.0, "y_value": 4.2},
                    {"x_value": 3.0, "y_value": 6.1}
                ]
            }
        }


class DatapointCSV(BaseModel):
    """Schema for CSV import"""
    session_id: int = Field(..., description="Session ID")
    csv_content: str = Field(..., description="CSV content with x_value and y_value columns")


class DatapointStats(BaseModel):
    """Schema for datapoint statistics"""
    point_id: int
    session_id: int
    x_value: float
    y_value: float
    deviation: Optional[float] = Field(None, description="Deviation from approximated curve")

    class Config:
        from_attributes = True
