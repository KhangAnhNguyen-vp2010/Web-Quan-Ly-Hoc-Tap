namespace WebAPI.DTOs.Assignment
{
    public class CreateAssignmentDto
    {
        public int CourseID { get; set; }
        public string? AssignmentName { get; set; }

        public DateOnly? DueDate { get; set; }

        public string? AssignmentContent { get; set; }
    }
}
