namespace API.DTOs;

public interface IContactDTO
{
    public string FirstName { get; }
    public string LastName { get; }
    public string Phone { get; }
    public string Email { get; }
}

public record ContactDataDTO
{
    public string FirstName { get; init; }
    public string LastName { get; init; }
    public string Phone { get; init; }
    public string Email { get; init; }

    public ContactDataDTO(string firstName, string lastName, string phone, string email)
    {
        FirstName = firstName;
        LastName = lastName;
        Phone = phone;
        Email = email;
    }
}

public record NewContactDTO : ContactDataDTO
{
    public int? InstitutionID { get; init; }

    public NewContactDTO(
        string firstName,
        string lastName,
        string phone,
        string email,
        int? institutionID)
        : base(firstName, lastName, phone, email)
    { InstitutionID = institutionID; }
}

public record ContactBaseDTO : ContactDataDTO
{
    public int ContactID { get; init; }

    public ContactBaseDTO(
        int contactID, 
        string firstName, 
        string lastName, 
        string phone, 
        string email) 
        : base(firstName, lastName, phone, email) 
    { ContactID = contactID; }
}