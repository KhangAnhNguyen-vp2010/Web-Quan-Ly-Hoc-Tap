using System;
using System.Collections.Generic;

namespace WebAPI.Models;

public partial class Course
{
    public int CourseId { get; set; }

    public string CourseName { get; set; } = null!;

    public int? InstructorId { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();

    public virtual User? Instructor { get; set; }

    public virtual ICollection<Test> Tests { get; set; } = new List<Test>();
}
