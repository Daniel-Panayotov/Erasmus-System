using API.DTOs;
using API.Models;
using LinqKit;
using System.Linq.Expressions;

namespace API.Expressions;

public class StudentExpressions
{
    public readonly static Expression<Func<Student, StudentDataDTO>> Data =
        s => new StudentDataDTO(
            s.FirstName,
            s.LastName,
            s.GenderEnum,
            s.BirthDate,
            s.Nationality,
            s.Address,
            s.PhoneNumber
        );


    public readonly static Expression<Func<Student, StudentBaseDTO>> Base = 
        s => new StudentBaseDTO(
            s.StudentId,
            StudentExpressions.Data.Invoke(s)
        );
}
