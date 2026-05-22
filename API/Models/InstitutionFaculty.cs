using System;
using System.Collections.Generic;

namespace API.Models;

public partial class InstitutionFaculty
{
    public int InstitutionFacultyId { get; set; }

    public string Name { get; set; } = null!;

    public int InstitutionId { get; set; }

    public virtual Institution Institution { get; set; } = null!;

    public virtual ICollection<Subject> Subjects { get; set; } = new List<Subject>();
}
