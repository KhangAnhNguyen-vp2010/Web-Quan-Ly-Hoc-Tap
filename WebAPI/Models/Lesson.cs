using System;
using System.Collections.Generic;

namespace WebAPI.Models;

public partial class Lesson
{
    public int LessonId { get; set; }

    public int CourseId { get; set; }

    public string LessonName { get; set; } = null!;

    public string LinkYoutube { get; set; } = null!;

    public virtual Course Course { get; set; } = null!;
}
