namespace API.Models;

public partial class Faculty
{
    public int FacultyId { get; set; }

    public string Name { get; set; } = null!;

    public int? ContactId { get; set; }

    public int? UniversityId { get; set; }

    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();

    public virtual Contact? Contact { get; set; }

    public virtual ICollection<Discipline> Disciplines { get; set; } = new List<Discipline>();

    public virtual ICollection<FacultyMobility> FacultyMobilities { get; set; } = new List<FacultyMobility>();

    public virtual ICollection<Subject> Subjects { get; set; } = new List<Subject>();

    public virtual University? University { get; set; }
}
