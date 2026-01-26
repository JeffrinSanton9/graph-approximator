from routers.datapoints import router as router_datapoint
from routers.sessions import router as router_session
from routers.users import router as router_user
from routers.approximators import router as router_approximator
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # During development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router_datapoint)
app.include_router(router_session)
app.include_router(router_user)
app.include_router(router_approximator)

