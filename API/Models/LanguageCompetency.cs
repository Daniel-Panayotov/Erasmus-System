using System;
using System.Collections.Generic;

namespace API.Models;

public partial class LanguageCompetency
{
    public int LanguageCompetencyId { get; set; }

    public string Language { get; set; } = null!;

    public bool CanFollowLectures { get; set; }

    public bool CanFollowLecturesWithLessons { get; set; }

    public int StudentId { get; set; }

    public virtual Student Student { get; set; } = null!;
}
