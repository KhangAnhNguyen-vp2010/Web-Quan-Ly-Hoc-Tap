# Controllers/AssignmentsController.py

from fastapi import APIRouter, HTTPException
from Models.AssignmentsModel import Assignment, AssignmentCreate
from database import get_connection

router = APIRouter()

@router.get("/assignments", response_model=list[Assignment])
def get_all_assignments():
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT AssignmentID, CourseID, AssignmentName, DueDate
            FROM Assignments
        """)
        rows = cursor.fetchall()

        return [
            Assignment(
                AssignmentID=row.AssignmentID,
                CourseID=row.CourseID,
                AssignmentName=row.AssignmentName,
                DueDate=row.DueDate
            )
            for row in rows
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()


@router.post("/assignments", response_model=Assignment)
def create_assignment(assignment: AssignmentCreate):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO Assignments (CourseID, AssignmentName, DueDate)
            OUTPUT INSERTED.CourseID
            VALUES (?, ?, ?)
            """,
            assignment.CourseID,
            assignment.AssignmentName,
            assignment.DueDate
        )

    
        new_id = cursor.fetchone()[0]

        conn.commit()

        return Assignment(
            AssignmentID=new_id,
            CourseID=assignment.CourseID,
            AssignmentName=assignment.AssignmentName,
            DueDate=assignment.DueDate
        )
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()