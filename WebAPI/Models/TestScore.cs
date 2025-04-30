using System;
using System.Collections.Generic;

namespace WebAPI.Models;

public partial class TestScore
{
    public int ScoreId { get; set; }

    public int? UserId { get; set; }

    public int? TestId { get; set; }

    public decimal? Score { get; set; }

    public DateTime? CompletedDate { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public virtual Test? Test { get; set; }

    public virtual User? User { get; set; }
}
