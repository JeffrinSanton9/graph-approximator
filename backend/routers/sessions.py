from models.sessions import Sessions
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from models.users import User
from schemas.sessions import SessionCreate, SessionUpdate, SessionResponse
from core.taylor_series import taylor_series
from core.polynomial_regression import polynomial_regression

from models.datapoints import Datapoints
from database.database import get_db

router = APIRouter(prefix="/session", tags=["sessions"])

@router.post("", response_model=SessionResponse)
def create_session(session: SessionCreate, db: Session = Depends(get_db)):
    """Create a new session"""
    user = db.query(User).filter(User.user_id == session.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    new_session = Sessions(
        user_id=session.user_id,
        session_name=session.session_name,
        description=session.description
    )
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return new_session


@router.get("/{session_id}", response_model=SessionResponse)
def get_session(session_id: int, db: Session = Depends(get_db)):
    """Get session information by ID"""
    session = db.query(Sessions).filter(Sessions.session_id == session_id).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return session


@router.put("/{session_id}", response_model=SessionResponse)
def update_session(session_id: int, session_update: SessionUpdate, db: Session = Depends(get_db)):
    """Update session information"""
    session = db.query(Sessions).filter(Sessions.session_id == session_id).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    if session_update.session_name:
        session.session_name = session_update.session_name
    
    if session_update.description:
        session.description = session_update.description
    
    session.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(session)
    return session


@router.delete("/{session_id}")
def delete_session(session_id: int, db: Session = Depends(get_db)):
    """Delete a session"""
    session = db.query(Sessions).filter(Sessions.session_id == session_id).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    db.delete(session)
    db.commit()
    return {"message": "Session deleted successfully"}


@router.get("/user/{user_id}")
def get_user_sessions(user_id: int, db: Session = Depends(get_db)):
    """Get all sessions for a particular user"""
    # Verify user exists
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    sessions = db.query(Sessions).filter(Sessions.user_id == user_id).all()
    return sessions


@router.post("/{session_id}/approximate")
def approximate_session(session_id: int, db: Session = Depends(get_db)):
    """Approximate all data points of a session to a function"""
    session = db.query(Sessions).filter(Sessions.session_id == session_id).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    data_points = db.query(Datapoints).filter(Datapoints.session_id == session_id).all()
    
    if not data_points:
        raise HTTPException(status_code=400, detail="No data points found in this session")
    
    points = [[point.x_value, point.y_value] for point in data_points]
    print(points)
    result = polynomial_regression(points)
    
    return {
        "result": result,
        "session_id": session_id,
        "approximation": "Approximation logic to be implemented",
        "data_points_count": len(data_points)
    }

