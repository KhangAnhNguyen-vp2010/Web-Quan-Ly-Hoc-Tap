using System;
using System.Collections.Generic;

namespace WebAPI.Models;

public partial class AssignmentsCompleted
{
    public int CompletionId { get; set; }

    public int? UserId { get; set; }

    public int? AssignmentId { get; set; }

    public DateOnly? CompletionDate { get; set; }

    public decimal? Grade { get; set; }

    public virtual Assignment? Assignment { get; set; }

    public virtual ICollection<AssignmentCompletedFile> AssignmentCompletedFiles { get; set; } = new List<AssignmentCompletedFile>();

    public virtual User? User { get; set; }
}
