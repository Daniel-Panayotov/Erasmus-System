namespace API.Models;

public partial class Subject
{
    public int SubjectId { get; set; }

    public string Name { get; set; } = null!;

    public string Code { get; set; } = null!;

    public int Credits { get; set; }

    public int? FacultyId { get; set; }

    public virtual Faculty? Faculty { get; set; }

    public virtual ICollection<RelDisciplineSubject> RelDisciplineSubjects { get; set; } = new List<RelDisciplineSubject>();

    public virtual ICollection<RelFacultyMobilitiesSubject> RelFacultyMobilitiesSubjects { get; set; } = new List<RelFacultyMobilitiesSubject>();
}
