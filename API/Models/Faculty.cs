using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Faculty
{
    public int FacultyId { get; set; }

    public string Name { get; set; } = null!;

    public int InstitutionId { get; set; }

    public virtual ICollection<Discipline> Disciplines { get; set; } = new List<Discipline>();

    public virtual Institution Institution { get; set; } = null!;

    public virtual ICollection<Subject> Subjects { get; set; } = new List<Subject>();
}
