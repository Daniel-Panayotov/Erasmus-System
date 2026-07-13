namespace API.Models;

public partial class FileContent
{
    public int FileContentId { get; set; }

    public byte[] Content { get; set; } = null!;

    public virtual File? File { get; set; }
}
