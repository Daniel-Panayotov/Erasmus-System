using System;
using System.Collections.Generic;

namespace API.Models;

public partial class RelInstitutionApplicationSubject
{
    public int InstitutionApplicationSubjectId { get; set; }

    public int InstitutionApplicationId { get; set; }

    public int SubjectId { get; set; }

    public virtual RelInstitutionApplication InstitutionApplication { get; set; } = null!;

    public virtual Subject Subject { get; set; } = null!;
}
