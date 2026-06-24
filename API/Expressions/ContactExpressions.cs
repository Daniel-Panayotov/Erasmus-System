using API.DTOs;
using API.Models;
using System.Linq.Expressions;

namespace API.Expressions;

public class ContactExpressions
{
    public readonly static Expression<Func<Contact, ContactBaseDTO>> Base =
        c => new ContactBaseDTO(c.ContactId, c.FirstName, c.LastName, c.Phone, c.Email);
        
}
