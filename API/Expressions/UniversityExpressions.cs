using API.DTOs;
using API.Models;
using LinqKit;
using System.Linq.Expressions;

namespace API.Expressions;

public class UniversityExpressions
{
    public readonly static Expression<Func<University, UniversityDataDTO>> Data =
    u => new UniversityDataDTO(
        u.Code, u.Name, u.Address    
    );

    public readonly static Expression<Func<University, UniversityBaseDTO>> Base =
    u => new UniversityBaseDTO(
        u.UniversityId, UniversityExpressions.Data.Invoke(u)
    );
}
