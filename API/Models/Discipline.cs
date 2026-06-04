using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Discipline
{
    public int DisciplineId { get; set; }

    public string Name { get; set; } = null!;

    public string Code { get; set; } = null!;

    public int FacultyId { get; set; }

    public virtual Faculty Faculty { get; set; } = null!;

    public virtual ICollection<RelDisciplineSubject> RelDisciplineSubjects { get; set; } = new List<RelDisciplineSubject>();

    public virtual ICollection<RelInstitutionApplication> RelInstitutionApplications { get; set; } = new List<RelInstitutionApplication>();
}
