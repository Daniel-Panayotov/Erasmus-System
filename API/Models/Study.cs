namespace API.Models;

public partial class Study
{
    public int StudyId { get; set; }

    public int StudyDuration { get; set; }

    public string? Description { get; set; }

    public int ApplicationId { get; set; }

    public virtual Application Application { get; set; } = null!;
}
