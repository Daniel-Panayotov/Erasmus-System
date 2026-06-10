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
    public Gender Gender { get; init; }
    public DateOnly BirthDate { get; init; }
    public string Nationality { get; init; }
    public string Address { get; init; }
    public string PhoneNumber { get; init; }

    public StudentDataDTO(
        string firstname,
        string lastname,
        Gender gender,
        DateOnly birthdate,
        string nationality,
        string address,
        string phonenumber
    )
    {
        FirstName = firstname;
        LastName = lastname;
        Gender = gender;
        BirthDate = birthdate;
        Nationality = nationality;
        Address = address;
        PhoneNumber = phonenumber;
    }
}

public record StudentBaseDTO : StudentDataDTO, IDTO
{
    public int StudentID { get; init; }

    public StudentBaseDTO(
        int studentID, 
        string firstname, 
        string lastname,
        Gender gender, 
        DateOnly birthdate, 
        string nationality, 
        string address, 
        string phonenumber) : base(
            firstname,
            lastname,
            gender,
            birthdate,
            nationality,
            address,
            phonenumber)
    { StudentID = studentID; }

    public int GetID() => StudentID;
}

public record StudentDTO : StudentBaseDTO
{
    public int User { get; init; }
    public IEnumerable<int> Applications { get; init; }
    public IEnumerable<int> LanguageCompetencies { get; init; }

    public StudentDTO(
        int studentID,
        string firstname,
        string lastname,
        Gender gender,
        DateOnly birthDate,
        string nationality,
        string address,
        string phonenumber,
        int user,
        IEnumerable<int> applications,
        IEnumerable<int> languageCompetencies) : base(
            studentID, 
            firstname, 
            lastname, 
            gender, 
            birthDate, 
            nationality,        
            address,        
            phonenumber) 
    {
        User = user;
        Applications = applications;
        LanguageCompetencies = languageCompetencies;
    }
}