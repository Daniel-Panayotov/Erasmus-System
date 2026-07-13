namespace API.Models;

public partial class File
{
    public int FileId { get; set; }

    public string FileName { get; set; } = null!;

    public string ContentType { get; set; } = null!;

    public int FileSize { get; set; }

    public int FileContentId { get; set; }

    public virtual Application? Application { get; set; }

    public virtual ApplicationFile? ApplicationFile { get; set; }

    public virtual FileContent FileContent { get; set; } = null!;

    public virtual LanguageCompetency? LanguageCompetency { get; set; }
}
