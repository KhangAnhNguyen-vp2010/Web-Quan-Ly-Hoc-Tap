namespace WebAPI.DTOs.Lesson
{
    public class CreateLessonDto
    {
        public int CourseID { get; set; }
        public string? LessonName { get; set; }
        public string? LinkYoutube { get; set; }
    }
}
