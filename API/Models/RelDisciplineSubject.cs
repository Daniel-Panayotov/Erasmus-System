using System;
using System.Collections.Generic;

namespace API.Models;

public partial class RelDisciplineSubject
{
    public int DisciplineSubjectsId { get; set; }

    public int DisciplineId { get; set; }

    public int SubjectId { get; set; }

    public virtual Discipline Discipline { get; set; } = null!;

    public virtual Subject Subject { get; set; } = null!;
}
