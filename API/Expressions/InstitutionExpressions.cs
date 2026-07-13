using API.DTOs;
using API.Models;
using LinqKit;
using System.Linq.Expressions;

namespace API.Expressions;

public class InstitutionExpressions
{
    //public readonly static Expression<Func<Institution, InstitutionBaseDTO>> Base =
    //    i => new InstitutionBaseDTO(i.InstitutionId, i.Code, i.Name, i.Address);

    //public readonly static Expression<Func<Institution, InstitutionDTO>> DTO =
    //    i => new InstitutionDTO(i.InstitutionId, i.Code, i.Name, i.Address, i.Contacts.Select(c => ContactExpressions.Base.Invoke(c)));
}
