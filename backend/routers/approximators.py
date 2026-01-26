from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from models.sessions import Sessions
from models.users import User
from models.datapoints import Datapoints

from schemas.sessions import SessionCreate, SessionUpdate, SessionResponse

from core.taylor_series import taylor_series
from core.polynomial_regression import polynomial_regression
from core.linear_regression import linear_regression

from database.database import get_db

router = APIRouter(prefix="/approximate", tags=["approximator"])

@router.get("/polynomial/{session_id}")
def polynomial_approximator(
        session_id: int,
        degree : int | None = None, 
        db: Session = Depends(get_db)
        ):
    """Approximate all data points of a session to a function using polynomial regression"""
    session = db.query(Sessions).filter(Sessions.session_id == session_id).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    data_points = db.query(Datapoints).filter(Datapoints.session_id == session_id).all()
    
    if not data_points:
        raise HTTPException(status_code=400, detail="No data points found in this session")
    
    points = [[point.x_value, point.y_value] for point in data_points]
    result = polynomial_regression(points, degree)

    return {
        "session_id": session_id,
        "result": result,
    }

@router.post("/series/{session_id}")
def taylor_approximator(
        session_id: int,
        point_of_approximation : list[int] = [0,0],
        no_of_terms : int = 10,
        db: Session = Depends(get_db)
        ):
    """Approximate all data points of a session to a function using taylor series"""
    session = db.query(Sessions).filter(Sessions.session_id == session_id).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    data_points = db.query(Datapoints).filter(Datapoints.session_id == session_id).all()
    
    if not data_points:
        raise HTTPException(status_code=400, detail="No data points found in this session")
    
    points = [[point.x_value, point.y_value] for point in data_points]
    result = taylor_series(points, point_of_approximation, no_of_terms)

    return {
        "session_id": session_id,
        "result": result,
    }

@router.get("linear/{session_id}")
def linear_approximator(
        session_id : int,
        db: Session = Depends(get_db)
        ):
    """Approximate all data points of a session to a function using linear approximation"""
    session = db.query(Sessions).filter(Sessions.session_id == session_id).all()

    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    data_points = db.query(Datapoints).filter(Datapoints.session_id == session_id).all()

    points = [[point.x_value, point.y_value] for point in data_points]

    result = linear_regression(points, len(points))

    return {
        "session_id": session_id,
        "result": result,
    }



