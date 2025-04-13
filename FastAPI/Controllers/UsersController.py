# controllers.py

from fastapi import HTTPException
from Models.UsersModel import LoginRequest, User
from Services.services import authenticate_user  # gọi hàm authenticate_user trong services.py
from fastapi import APIRouter
from database import get_connection

router = APIRouter()

@router.post("/login")
async def login(request: LoginRequest):
    user = authenticate_user(request.username, request.password)
    if isinstance(user, str):
        # Nếu kết quả là một chuỗi thông báo lỗi
        raise HTTPException(status_code=401, detail=user)
    # Tiếp tục với logic đăng nhập nếu xác thực thành công
    return {"message": "Login successful", "username": user.username, "role": user.role}

# thêm user mới
@router.post("/add_user")
def add_user(user: User):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Kiểm tra trùng username trước
        cursor.execute("SELECT * FROM Users WHERE Username = ?", (user.username,))
        existing_user = cursor.fetchone()
        if existing_user:
            raise HTTPException(status_code=400, detail="Username already exists")

        # Thêm user nếu không trùng
        cursor.execute("INSERT INTO Users (Username, PasswordHash, FullName, Email, _Role) VALUES (?, ?, ?, ?, ?)", 
                       (user.username, user.password_hash, user.full_name, user.email, user.role))
        conn.commit()
        return {"message": "User added successfully"}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()


