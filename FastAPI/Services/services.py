# services.py

from database import get_connection  # Import hàm từ database.py
from passlib.context import CryptContext
from Models.UsersModel import User
from typing import Optional


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def authenticate_user(username: str, password: str) -> Optional[User]:
    conn = get_connection()  # Sử dụng hàm từ database.py
    cursor = conn.cursor()

    cursor.execute("SELECT Username, PasswordHash, _Role FROM Users WHERE Username = ?", username)
    user_data = cursor.fetchone()
    
    if user_data:
        username, password_hash, role = user_data
        if password == password_hash:
            # Nếu mật khẩu không được mã hóa, so sánh trực tiếp
            return User(username=username, password_hash=password_hash, role=role)
        else:
            # Trả về thông báo nếu mật khẩu sai
            return "Wrong password"
    else:
        # Trả về thông báo nếu tài khoản không tồn tại
        return "User does not exist"
