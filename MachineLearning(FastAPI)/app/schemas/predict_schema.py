from pydantic import BaseModel

class InputData(BaseModel):
    StudyTime: float
    AssignmentOnTime: int
    LateAssignment: int
    TestOnTime: int
    LateTest: int
    AvgAssignmentScore: float
    AvgTestScore: float
    ProcessScore: float
