using API.DTOs;
using API.Models;
using LinqKit;
using System.Linq.Expressions;

namespace API.Expressions;

public class ContactExpressions
{
    public readonly static Expression<Func<Contact, ContactDataDTO>> Data =
    c => new ContactDataDTO(
        c.FirstName, c.LastName, c.Phone, c.Email
    );

    public readonly static Expression<Func<Contact, ContactBaseDTO>> Base =
    c => new ContactBaseDTO(
        c.ContactId, ContactExpressions.Data.Invoke(c)
    );
}
