using API.DTOs;
using API.Models;
using System.Linq.Expressions;

namespace API.Expressions;

public class StudentExpressions
{
    public readonly static Expression<Func<Student, StudentBaseDTO>> Base = 
        s => new StudentBaseDTO(
            studentID: s.StudentId,
            firstname: s.FirstName,
            lastname: s.LastName,
            gender: s.GenderEnum,
            birthdate: s.BirthDate,
            nationality: s.Nationality,
            address: s.Address,
            phonenumber: s.PhoneNumber
        );
}
