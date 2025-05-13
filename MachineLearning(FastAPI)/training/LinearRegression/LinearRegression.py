import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score, max_error, explained_variance_score
import matplotlib.pyplot as plt
import numpy as np
import joblib  # Thêm thư viện joblib để lưu mô hình

# Bước 1: Đọc dữ liệu từ file CSV
data = pd.read_csv('training/data/student_dataset.csv')

# Bước 2: Chia dữ liệu thành các feature (X) và target (y)
X = data[['StudyTime', 'AssignmentOnTime', 'LateAssignment', 'TestOnTime', 'LateTest', 'AvgAssignmentScore', 'AvgTestScore', 'ProcessScore']]
y = data['PredictedScore']

# Bước 3: Chia dữ liệu thành tập huấn luyện và tập kiểm tra (80% huấn luyện, 20% kiểm tra)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Bước 4: Khởi tạo mô hình Linear Regression và huấn luyện
model = LinearRegression()
model.fit(X_train, y_train)

# Bước 5: Dự đoán với dữ liệu kiểm tra
y_pred = model.predict(X_test)

# Bước 6: Đánh giá mô hình đầy đủ
print("=== Evaluation Metrics ===")
print(f"MAE (Mean Absolute Error): {mean_absolute_error(y_test, y_pred):.3f}")
print(f"MSE (Mean Squared Error): {mean_squared_error(y_test, y_pred):.3f}")
print(f"RMSE (Root Mean Squared Error): {np.sqrt(mean_squared_error(y_test, y_pred)):.3f}")
print(f"R² Score: {r2_score(y_test, y_pred):.3f}")
print(f"Max Error: {max_error(y_test, y_pred):.3f}")
print(f"Explained Variance Score: {explained_variance_score(y_test, y_pred):.3f}")

# Bước 7: Vẽ đồ thị so sánh giá trị thực và giá trị dự đoán
plt.scatter(y_test, y_pred)
plt.plot([min(y_test), max(y_test)], [min(y_test), max(y_test)], color='red', linestyle='--')
plt.xlabel('Actual Scores')
plt.ylabel('Predicted Scores')
plt.title('Actual vs Predicted Scores')
plt.show()

# Bước 8: Lưu mô hình sau khi huấn luyện
joblib.dump(model, 'training/LinearRegression/linear_model.pkl')  # Lưu mô hình vào file
