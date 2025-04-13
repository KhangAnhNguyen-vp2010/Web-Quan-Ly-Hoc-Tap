# main.py
from fastapi import FastAPI
from Controllers.CourseController import router as course_router
from Controllers.AssignmentsController import router as assignments_router
from Controllers.UsersController import router as user_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả các domain (có thể thay bằng URL của frontend nếu muốn hạn chế)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Đăng ký router từ CourseController
app.include_router(course_router)
app.include_router(assignments_router)
app.include_router(user_router)