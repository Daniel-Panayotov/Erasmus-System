namespace API.Models;

public partial class Discipline
{
    public int DisciplineId { get; set; }

    public string Name { get; set; } = null!;

    public string Code { get; set; } = null!;

    public int? FacultyId { get; set; }

    public virtual Faculty? Faculty { get; set; }

    public virtual ICollection<FacultyMobility> FacultyMobilities { get; set; } = new List<FacultyMobility>();

    public virtual ICollection<RelDisciplineSubject> RelDisciplineSubjects { get; set; } = new List<RelDisciplineSubject>();
}
