namespace API.Models;

public partial class RelFacultyMobilitiesSubject
{
    public int RelFacultyMobilitiesSubjectId { get; set; }

    public int FacultyMobilityId { get; set; }

    public int SubjectId { get; set; }

    public virtual FacultyMobility FacultyMobility { get; set; } = null!;

    public virtual Subject Subject { get; set; } = null!;
}
