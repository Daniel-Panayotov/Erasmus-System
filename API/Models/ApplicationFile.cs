namespace API.Models;

public partial class ApplicationFile
{
    public int ApplicationFileId { get; set; }

    public DateTime? SignedAt { get; set; }

    public string Status { get; set; } = null!;

    public int ApplicationId { get; set; }

    public virtual Status StatusEnum => Enum.Parse<Status>(this.Status);

    public int? DocumentId { get; set; }

    public virtual Application Application { get; set; } = null!;

    public virtual File? Document { get; set; }
}

public enum Status { Pending, Signed, Rejected }