namespace WebAPI.DTOs.Test
{
    public class UpdateTestDto
    {
        public int CourseID { get; set; }
        public string? testName { get; set; }
        public string? testContent { get; set; }
        public DateOnly? testDate { get; set; }

    }
}
