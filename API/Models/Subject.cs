namespace API.Models;

public partial class Subject
{
    public int SubjectId { get; set; }

    public string Name { get; set; } = null!;

    public string Code { get; set; } = null!;

    public int Credits { get; set; }

    public int? InstitutionFacultyId { get; set; }

    public virtual Faculty? InstitutionFaculty { get; set; }

    public virtual ICollection<RelDisciplineSubject> RelDisciplineSubjects { get; set; } = new List<RelDisciplineSubject>();

    public virtual ICollection<RelInstitutionApplicationSubject> RelInstitutionApplicationSubjects { get; set; } = new List<RelInstitutionApplicationSubject>();
}
