using System;
using System.Collections.Generic;

namespace WebAPI.Models;

public partial class Prediction
{
    public int PredictionId { get; set; }

    public int? UserId { get; set; }

    public decimal? PredictedScore { get; set; }

    public decimal? StudyTime { get; set; }

    public int? CompletedAssignments { get; set; }

    public decimal? TestScores { get; set; }

    public DateOnly? PredictionDate { get; set; }

    public virtual User? User { get; set; }
}
