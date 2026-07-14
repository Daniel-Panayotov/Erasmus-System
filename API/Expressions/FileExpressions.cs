using API.DTOs;
using LinqKit;
using System.Linq.Expressions;

namespace API.Expressions;

public class FileExpressions
{
    public readonly static Expression<Func<API.Models.File, FileDataDTO>> Data =
    f => new FileDataDTO(f.FileName, f.ContentType, f.FileSize);

    public readonly static Expression<Func<API.Models.File, FileBaseDTO>> Base =
    f => new FileBaseDTO(f.FileId, FileExpressions.Data.Invoke(f));
}
