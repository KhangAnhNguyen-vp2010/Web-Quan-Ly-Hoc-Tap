# controllers/predict_controller.py

from fastapi import APIRouter
from app.schemas.predict_schema import InputData
from app.ml_model.predict import load_model_linear, load_model_random_forest, load_model_xgboost, predict_score

router = APIRouter()  # Ensure this line is present

model_linear = load_model_linear()

model_random_forest = load_model_random_forest()

model_xgboost = load_model_xgboost()

@router.post("/predict-LinearRegression")
def predict(data: InputData):
    result = predict_score(model_linear, data)
    return {"predicted_score": round(result, 1)}

@router.post("/predict-RandomForest")
def predict(data: InputData):
    result = predict_score(model_random_forest, data)
    return {"predicted_score": round(result, 1)}

@router.post("/predict-XGBoost")
def predict(data: InputData):
    result = predict_score(model_xgboost, data)
    return {"predicted_score": round(float(result), 1)}
