import joblib
import numpy as np
from app.schemas.predict_schema import InputData

def load_model_linear():
    return joblib.load("training/LinearRegression/linear_model.pkl")

def load_model_random_forest():
    return joblib.load("training/RandomForest/random_forest_model.pkl")

def load_model_xgboost():
    return joblib.load("training/XGBoost/xgboost_model.pkl")

def predict_score(model, data: InputData):
    features = np.array([[data.StudyTime,
                          data.AssignmentOnTime,
                          data.LateAssignment,
                          data.TestOnTime,
                          data.LateTest,
                          data.AvgAssignmentScore,
                          data.AvgTestScore,
                          data.ProcessScore]])
    return model.predict(features)[0]
