namespace WebAPI.DTOs.Assignment
{
    public class UpdateAssignmentDto
    {
        public string? AssignmentName { get; set; }
        public DateOnly? DueDate { get; set; }
        public string? AssignmentContent { get; set; }
    }
}
