using API.DTOs;
using API.Models;
using LinqKit;
using System.Linq.Expressions;

namespace API.Expressions;

public class ContactExpressions
{
    //public readonly static Expression<Func<Contact, ContactBaseDTO>> Base =
    //    c => new ContactBaseDTO(c.ContactId, c.FirstName, c.LastName, c.Phone, c.Email);

    //public readonly static Expression<Func<Contact, ContactDTO>> DTO =
    //    c => new ContactDTO(c.ContactId, c.FirstName, c.LastName, c.Phone, c.Email, c.Institution != null ? InstitutionExpressions.Base.Invoke(c.Institution) : null);
}
