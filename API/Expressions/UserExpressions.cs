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

    public readonly static Expression<Func<User, UserDTO>> DTO =
    s => new UserDTO(
        s.UserId,
        s.Email,
        s.Password,
        new StudentBaseDTO(s.Student.StudentId, s.Student.FirstName, s.Student.LastName, s.Student.BirthDate, s.Student.GenderEnum, s.Student.Nationality, s.Student.Address, s.Student.PhoneNumber)
    );
}
