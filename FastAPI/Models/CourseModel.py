from pydantic import BaseModel

class Course(BaseModel):
    CourseID: int
    CourseName: str
    InstructorID: int | None = None
    Description: str | None = None  # ✅ Đổi tên không có dấu gạch dưới

class CourseCreate(BaseModel):
    CourseName: str
    InstructorID: int | None = None
    Description: str | None = None
