using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Subject
{
    public int SubjectId { get; set; }

    public int Code { get; set; }

    public string Name { get; set; } = null!;

    public int InstitutionFacultyId { get; set; }

    public virtual InstitutionFaculty InstitutionFaculty { get; set; } = null!;
}
