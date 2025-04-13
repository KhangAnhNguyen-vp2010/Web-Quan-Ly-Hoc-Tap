# main.py
from fastapi import APIRouter, HTTPException
from Models.CourseModel import Course, CourseCreate
from database import get_connection

router = APIRouter()

@router.get("/courses", response_model=list[Course])
def get_courses():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT CourseID, CourseName, InstructorID, _Description FROM Courses")
    rows = cursor.fetchall()

    courses = []
    for row in rows:
        courses.append(Course(
            CourseID=row.CourseID,
            CourseName=row.CourseName,
            InstructorID=row.InstructorID,
            Description=row._Description
        ))

    conn.close()
    return courses


@router.post("/courses", response_model=Course)
def create_course(course: CourseCreate):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO Courses (CourseName, InstructorID, _Description)
            OUTPUT INSERTED.CourseID
            VALUES (?, ?, ?)
            """,
            course.CourseName,
            course.InstructorID,
            course.Description
        )
        # Lấy ID vừa được tạo
        new_id = cursor.fetchone()[0]
        conn.commit()

        

        # Trả về khóa học vừa tạo
        return Course(
            CourseID=new_id,
            CourseName=course.CourseName,
            InstructorID=course.InstructorID,
            Description=course.Description
        )
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()