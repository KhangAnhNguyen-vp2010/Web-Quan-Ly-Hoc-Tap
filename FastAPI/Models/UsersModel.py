# models.py
from pydantic import BaseModel

class User(BaseModel):
    username: str
    password_hash: str
    full_name: str | None = None
    email: str | None = None
    role: str

class LoginRequest(BaseModel):
    username: str
    password: str
