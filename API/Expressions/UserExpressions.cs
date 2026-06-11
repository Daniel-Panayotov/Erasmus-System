using API.DTOs;
using API.Models;
using LinqKit;
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

    public readonly static Expression<Func<User, UserDTO>> DTO =
    s => new UserDTO(
        s.UserId,
        s.Email,
        s.Password,
        student: s.Student == null ? null : StudentExpressions.Base.Invoke(s.Student)
    );
}
