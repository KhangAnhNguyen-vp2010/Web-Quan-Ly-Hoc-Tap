using System;
using System.Collections.Generic;

namespace WebAPI.Models;

public partial class TestFile
{
    public int FileId { get; set; }

    public int TestId { get; set; }

    public string FileName { get; set; } = null!;

    public string? FileType { get; set; }

    public string FilePath { get; set; } = null!;

    public DateTime? UploadDate { get; set; }

    public virtual Test Test { get; set; } = null!;
}
