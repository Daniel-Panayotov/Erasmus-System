using API.Models;

namespace API.DTOs;

public record StudentDataDTO
(
    string FirstName,
    string LastName,
    Gender Gender,
    DateOnly BirthDate,
    string Nationality,
    string Address,
    string PhoneNumber
);

public record NewStudentDTO
(
    IEnumerable<SaveLanguageCompetencyDTO> LanguageCompetencies,
    StudentDataDTO DataDTO
);

public record StudentBaseDTO
(
    int StudentID,
    StudentDataDTO DataDTO
);
