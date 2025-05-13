# main.py

from fastapi import FastAPI
from app.controllers.predict_controller import router as predict_router

app = FastAPI()

# Include the controller routes
app.include_router(predict_router)
