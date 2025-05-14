from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score, max_error, explained_variance_score
import joblib
import numpy as np
from app.schemas.predict_schema import InputData
import pandas as pd
from sklearn.model_selection import train_test_split

def load_model_linear():
    return joblib.load("training/LinearRegression/linear_model.pkl")

def load_model_random_forest():
    return joblib.load("training/RandomForest/random_forest_model.pkl")

def load_model_xgboost():
    return joblib.load("training/XGBoost/xgboost_model.pkl")

data = pd.read_csv('training/data/student_dataset.csv')
X = data[['StudyTime', 'AssignmentOnTime', 'LateAssignment', 'TestOnTime', 'LateTest', 'AvgAssignmentScore', 'AvgTestScore', 'ProcessScore']]
y = data['PredictedScore']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

def predict_score(model, data: InputData):
    features = np.array([[data.StudyTime,
                          data.AssignmentOnTime,
                          data.LateAssignment,
                          data.TestOnTime,
                          data.LateTest,
                          data.AvgAssignmentScore,
                          data.AvgTestScore,
                          data.ProcessScore]])
    
    y_pred = model.predict(features)[0]

    # Dự đoán cho dữ liệu kiểm tra (để tính toán các tham số đánh giá)
    y_pred_test = model.predict(X_test)
    
    # Tính các chỉ số đánh giá mô hình so với giá trị thực tế trong y_test
    mae = mean_absolute_error(y_test, y_pred_test)
    mse = mean_squared_error(y_test, y_pred_test)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, y_pred_test)
    max_err = max_error(y_test, y_pred_test)
    evs = explained_variance_score(y_test, y_pred_test)

    # return {y_pred, mae, mse, rmse, r2, max_err, evs}
    return {
        "predicted_score": round(float(y_pred), 1),
        "mae": round(mae ,3),
        "mse": round(mse, 3),
        "rmse": round(rmse, 3),
        "r2_score": round(r2, 3),
        "max_error": round(max_err, 3),
        "explained_variance_score": round(evs, 3)
    }
