namespace API.Models;

public partial class Application
{
    public int ApplicationId { get; set; }

    public byte[] Photo { get; set; } = null!;

    public string MobilityType { get; set; } = null!;

    public DateOnly StudyFrom { get; set; }

    public DateOnly StudyTo { get; set; }

    public bool Accommodation { get; set; }

    public DateOnly? AccommodationFrom { get; set; }

    public DateOnly? AccommodationTo { get; set; }

    public bool BulgarianCourse { get; set; }

    public string? MotivationText { get; set; }

    public string Degree { get; set; } = null!;

    public bool PriorStudyAbroad { get; set; }

    public int? PriorStudyDuration { get; set; }

    public int StudentId { get; set; }

    public int SendingInstitution { get; set; }

    public int ReceivingInstitution { get; set; }

    public virtual MobilityType MobilityTypeEnum => Enum.Parse<MobilityType>(this.MobilityType);
    public virtual Degree DegreeEnum => Enum.Parse<Degree>(this.Degree);

    public virtual ApplicationDocument? ApplicationDocument { get; set; }

    public virtual Institution ReceivingInstitutionNavigation { get; set; } = null!;

    public virtual ICollection<RelInstitutionApplication> RelInstitutionApplications { get; set; } = new List<RelInstitutionApplication>();

    public virtual Institution SendingInstitutionNavigation { get; set; } = null!;

    public virtual Student Student { get; set; } = null!;

    public virtual ICollection<WorkExperience> WorkExperiences { get; set; } = new List<WorkExperience>();
}

public enum MobilityType { Study, Traineeship }
public enum Degree { Bachelor, Master }