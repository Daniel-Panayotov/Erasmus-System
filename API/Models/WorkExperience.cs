namespace API.Models;

public partial class WorkExperience
{
    public int WorkExperienceId { get; set; }

    public string ExperienceType { get; set; } = null!;

    public string Organisation { get; set; } = null!;

    public DateOnly From { get; set; }

    public DateOnly To { get; set; }

    public string Country { get; set; } = null!;

    public int ApplicationId { get; set; }

    public virtual WorkExperienceType ExperienceTypeEnum => Enum.Parse<WorkExperienceType>(this.ExperienceType);

    public virtual Application Application { get; set; } = null!;
}

public enum WorkExperienceType { Internship, Employment, Volunteering }