using API.Models;

namespace API.DTOs;

public record StudentBaseDTO : DTO
{
    public int StudentID { get; init; }
    public string FirstName { get; init; }
    public string LastName { get; init; }
    public Gender Gender { get; init; }
    public DateOnly BirthDate { get; init; }
    public string Nationality { get; init; }
    public string Address { get; init; }
    public string PhoneNumber { get; init; }

    public StudentBaseDTO(
        int studentID, 
        string firstname, 
        string lastname,
        Gender gender, 
        DateOnly birthDate, 
        string nationality, 
        string address, 
        string phonenumber
    ) 
    { 
        StudentID = studentID;
        FirstName = firstname;
        LastName = lastname;
        Gender = gender;
        BirthDate = birthDate;
        Nationality = nationality;
        Address = address;
        PhoneNumber = phonenumber;
    }

    public override int GetID() => StudentID;
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