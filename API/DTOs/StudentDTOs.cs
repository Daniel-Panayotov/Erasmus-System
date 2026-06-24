using API.Models;

namespace API.DTOs;

public interface IStudentDTO
{
    public string FirstName { get; }
    public string LastName { get; }
    public Gender Gender { get; }
    public DateOnly BirthDate { get; }
    public string Nationality { get; }
    public string Address { get; }
    public string PhoneNumber { get; }
}

public record StudentDataDTO : IStudentDTO
{
    public string FirstName { get; init; }
    public string LastName { get; init; }
    public DateOnly BirthDate { get; init; }
    public Gender Gender { get; init; }
    public string Nationality { get; init; }
    public string Address { get; init; }
    public string PhoneNumber { get; init; }

    public StudentDataDTO(
        string firstname,
        string lastname,
        DateOnly birthdate,
        Gender gender,
        string nationality,
        string address,
        string phonenumber
    )
    {
        FirstName = firstname;
        LastName = lastname;
        BirthDate = birthdate;
        Gender = gender;
        Nationality = nationality;
        Address = address;
        PhoneNumber = phonenumber;
    }
}

public record NewStudentDTO : StudentDataDTO
{
    public IEnumerable<LanguageCompetencyDataDTO> LanguageCompetencies { get; init; }
    public NewStudentDTO(
        string firstname,
        string lastname,
        DateOnly birthdate,
        Gender gender,
        string nationality,
        string address,
        string phonenumber,
        IEnumerable<LanguageCompetencyDataDTO> languageCompetencies) : base(
            firstname,
            lastname,
            birthdate,
            gender,
            nationality,
            address,
            phonenumber)
    { LanguageCompetencies = languageCompetencies; }
}

public record StudentBaseDTO : StudentDataDTO
{
    public int StudentID { get; init; }

    public StudentBaseDTO(
        int studentID, 
        string firstname, 
        string lastname,
        DateOnly birthdate, 
        Gender gender, 
        string nationality, 
        string address, 
        string phonenumber) : base(
            firstname,
            lastname,
            birthdate,
            gender,
            nationality,
            address,
            phonenumber)
    { StudentID = studentID; }
}
// TODO: Replace competency int with dtos
public record StudentDTO : StudentBaseDTO
{
    public SafeUserDTO User { get; init; }
    public IEnumerable<ApplicationBaseDTO> Applications { get; init; }
    public IEnumerable<int> LanguageCompetencies { get; init; }

    public StudentDTO(
        int studentID,
        string firstname,
        string lastname,
        DateOnly birthdate,
        Gender gender,
        string nationality,
        string address,
        string phonenumber,
        SafeUserDTO user,
        IEnumerable<ApplicationBaseDTO> applications,
        IEnumerable<int> languageCompetencies) : base(
            studentID, 
            firstname, 
            lastname, 
            birthdate, 
            gender, 
            nationality,        
            address,        
            phonenumber) 
    {
        User = user;
        Applications = applications;
        LanguageCompetencies = languageCompetencies;
    }
}