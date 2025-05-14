# main.py
from fastapi import FastAPI
from app.controllers.predict_controller import router as predict_router
from app.middleware.cors import add_cors

app = FastAPI()

add_cors(app)

# Include the controller routes
app.include_router(predict_router)
