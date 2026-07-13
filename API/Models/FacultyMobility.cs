namespace API.Models;

public partial class FacultyMobility
{
    public int MobilityId { get; set; }

    public int ContactId { get; set; }

    public int FacultyId { get; set; }

    public int DisciplineId { get; set; }

    public virtual Contact Contact { get; set; } = null!;

    public virtual Discipline Discipline { get; set; } = null!;

    public virtual Faculty Faculty { get; set; } = null!;

    public virtual Mobility Mobility { get; set; } = null!;

    public virtual ICollection<RelFacultyMobilitiesSubject> RelFacultyMobilitiesSubjects { get; set; } = new List<RelFacultyMobilitiesSubject>();
}
