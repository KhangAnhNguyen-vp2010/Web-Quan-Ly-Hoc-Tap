﻿using System;
using System.Collections.Generic;

namespace WebAPI.Models;

public partial class Assignment
{
    public int AssignmentId { get; set; }

    public int? CourseId { get; set; }

    public string AssignmentName { get; set; } = null!;

    public DateOnly? DueDate { get; set; }

    public virtual ICollection<AssignmentsCompleted> AssignmentsCompleteds { get; set; } = new List<AssignmentsCompleted>();

    public virtual Course? Course { get; set; }
}
