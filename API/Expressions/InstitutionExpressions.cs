using API.DTOs;
using API.Models;
using System.Linq.Expressions;

namespace API.Expressions;

public class InstitutionExpressions
{
    public readonly static Expression<Func<Institution, InstitutionBaseDTO>> Base =
        i => new InstitutionBaseDTO(i.InstitutionId, i.Code, i.Name, i.Address);
}
