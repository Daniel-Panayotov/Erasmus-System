namespace API.Models;

public partial class ApplicationDocument
{
    public int ApplicationDocumentId { get; set; }

    public byte[] Application { get; set; } = null!;

    public string Status { get; set; } = null!;

    public int ApplicationId { get; set; }

    public virtual Status StatusEnum => Enum.Parse<Status>(this.Status);

    public virtual Application ApplicationNavigation { get; set; } = null!;
}

public enum Status { Pending, Approved, Rejected }