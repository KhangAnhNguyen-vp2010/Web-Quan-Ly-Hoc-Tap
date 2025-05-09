using System;
using System.Collections.Generic;

namespace WebAPI.Models;

public partial class AssignmentCompletedFile
{
    public int FileId { get; set; }

    public int CompletionId { get; set; }

    public string FileName { get; set; } = null!;

    public string? FileType { get; set; }

    public string FilePath { get; set; } = null!;

    public DateTime? UploadDate { get; set; }

    public virtual AssignmentsCompleted Completion { get; set; } = null!;
}
