using API.DTOs;
using System.Linq.Expressions;

namespace API.Expressions;

public class FileExpressions
{
    public readonly static Expression<Func<API.Models.File, FileBaseDTO>> Base =
    f => new FileBaseDTO(f.FileId, f.FileName, f.ContentType, f.FileSize);
}
