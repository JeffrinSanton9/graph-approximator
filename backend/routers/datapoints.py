from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from models.datapoints import Datapoints
from models.sessions import Sessions

from schemas.datapoints import DatapointCreate, DatapointUpdate, DatapointResponse

from database.database import get_db

router = APIRouter(prefix="/datapoint", tags=["datapoints"])

@router.post("", response_model=DatapointResponse)
def create_datapoint(datapoint: DatapointCreate, db: Session = Depends(get_db)):
    """Create new data points"""
    # Verify session exists
    session = db.query(Sessions).filter(Sessions.session_id == datapoint.session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    new_datapoint = Datapoints(
        session_id=datapoint.session_id,
        x_value=datapoint.x_value,
        y_value=datapoint.y_value
    )
    db.add(new_datapoint)
    db.commit()
    db.refresh(new_datapoint)
    return new_datapoint


@router.get("/{point_id}", response_model=DatapointResponse)
def get_datapoint(point_id: int, db: Session = Depends(get_db)):
    """Get datapoint information by ID"""
    datapoint = db.query(Datapoints).filter(Datapoints.point_id == point_id).first()
    
    if not datapoint:
        raise HTTPException(status_code=404, detail="Datapoint not found")
    
    return datapoint


@router.put("/{point_id}", response_model=DatapointResponse)
def update_datapoint(point_id: int, datapoint_update: DatapointUpdate, db: Session = Depends(get_db)):
    """Update datapoint"""
    datapoint = db.query(Datapoints).filter(Datapoints.point_id == point_id).first()
    
    if not datapoint:
        raise HTTPException(status_code=404, detail="Datapoint not found")
    
    if datapoint_update.x_value is not None:
        datapoint.x_value = datapoint_update.x_value
    
    if datapoint_update.y_value is not None:
        datapoint.y_value = datapoint_update.y_value
    
    db.commit()
    db.refresh(datapoint)
    return datapoint


@router.delete("/{point_id}")
def delete_datapoint(point_id: int, db: Session = Depends(get_db)):
    """Delete a datapoint"""
    datapoint = db.query(Datapoints).filter(Datapoints.point_id == point_id).first()
    
    if not datapoint:
        raise HTTPException(status_code=404, detail="Datapoint not found")
    
    db.delete(datapoint)
    db.commit()
    return {"message": "Datapoint deleted successfully"}


@router.get("/session/{session_id}")
def get_session_datapoints(session_id: int, db: Session = Depends(get_db)):
    """Get all datapoints for a particular session"""
    # Verify session exists
    session = db.query(Sessions).filter(Sessions.session_id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    datapoints = db.query(Datapoints).filter(Datapoints.session_id == session_id).all()
    return datapoints
