using System;
using System.Collections.Generic;

namespace WebAPI.Models;

public partial class Test
{
    public int TestId { get; set; }

    public int? CourseId { get; set; }

    public string TestName { get; set; } = null!;

    public DateOnly? TestDate { get; set; }

    public virtual Course? Course { get; set; }

    public virtual ICollection<TestScore> TestScores { get; set; } = new List<TestScore>();
}
