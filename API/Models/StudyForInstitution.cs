using System;
using System.Collections.Generic;

namespace API.Models;

public partial class StudyForInstitution
{
    public int StudyForInstitutionId { get; set; }

    public int ApplicationId { get; set; }

    public int InstitutionId { get; set; }

    public virtual Application Application { get; set; } = null!;

    public virtual Institution Institution { get; set; } = null!;
}
