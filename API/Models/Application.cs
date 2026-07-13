namespace API.Models;

public partial class Application
{
    public int ApplicationId { get; set; }

    public int PhotoId { get; set; }

    public DateOnly StudyFrom { get; set; }

    public DateOnly StudyTo { get; set; }

    public bool Accommodation { get; set; }

    public DateOnly? AccommodationFrom { get; set; }

    public DateOnly? AccommodationTo { get; set; }

    public bool BulgarianCourse { get; set; }

    public string? MotivationText { get; set; }

    public string Degree { get; set; } = null!;

    public int MobilityId { get; set; }

    public int StudentId { get; set; }

    public int SendingFacultyId { get; set; }

    public int TermId { get; set; }

    public virtual Degree DegreeEnum => Enum.Parse<Degree>(this.Degree);

    public virtual ApplicationFile? ApplicationFile { get; set; }

    public virtual Mobility Mobility { get; set; } = null!;

    public virtual File Photo { get; set; } = null!;

    public virtual Faculty SendingFaculty { get; set; } = null!;

    public virtual Student Student { get; set; } = null!;

    public virtual ICollection<Study> Studies { get; set; } = new List<Study>();

    public virtual Term Term { get; set; } = null!;

    public virtual ICollection<WorkExperience> WorkExperiences { get; set; } = new List<WorkExperience>();
}

public enum Degree { Bachelor, Master }