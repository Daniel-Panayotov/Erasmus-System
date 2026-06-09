using API.DTOs;
using API.Models;
using System.Linq.Expressions;

namespace API.Expressions;

public class UserExpressions
{
    public readonly static Expression<Func<User, UserBaseDTO>> Base =
    s => new UserBaseDTO(
        s.UserId,
        s.Email,
        s.Password
    );
}
