using System;
using System.Collections.Generic;

namespace WebAPI.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string? FullName { get; set; }

    public string? Email { get; set; }

    public string? Role { get; set; }

    public string? RefreshToken { get; set; }

    public DateTime? RefreshTokenExpiryTime { get; set; }

    public string? SessionId { get; set; }

    public virtual ICollection<AssignmentsCompleted> AssignmentsCompleteds { get; set; } = new List<AssignmentsCompleted>();

    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();

    public virtual ICollection<Prediction> Predictions { get; set; } = new List<Prediction>();

    public virtual ICollection<TestScore> TestScores { get; set; } = new List<TestScore>();
}
