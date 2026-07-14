using API.DTOs;
using API.Models;
using LinqKit;
using System.Linq.Expressions;

namespace API.Expressions;

public class UserExpressions
{
    public readonly static Expression<Func<User, UserDataDTO>> Data =
    u => new UserDataDTO(
        u.Email,
        u.Password
    );

    public readonly static Expression<Func<User, UserBaseDTO>> Base =
    s => new UserBaseDTO(
        s.UserId,
        UserExpressions.Data.Invoke(s)
    );

    public readonly static Expression<Func<User, UserDTO>> DTO =
    s => new UserDTO(
        s.Student == null ? null : StudentExpressions.Base.Invoke(s.Student),
        UserExpressions.Base.Invoke(s)
    );
}
