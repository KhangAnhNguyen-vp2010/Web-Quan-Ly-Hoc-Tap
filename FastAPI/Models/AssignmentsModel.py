from pydantic import BaseModel
from typing import Optional
from datetime import date
from typing import Optional

class Assignment(BaseModel):
    AssignmentID: int
    CourseID: int
    AssignmentName: str
    DueDate: Optional[date] = None

    class Config:
        from_attributes = True  # Cho phép Pydantic chuyển đổi từ ORM (SQLAlchemy hoặc khác)


class AssignmentCreate(BaseModel):
    CourseID: int
    AssignmentName: str
    DueDate: Optional[date] = None
