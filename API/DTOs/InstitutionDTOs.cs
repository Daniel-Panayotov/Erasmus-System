namespace API.DTOs;

public interface IInstitutionDTO
{
    public string Code { get; }
    public string Name { get; }
    public string Address { get; }
}

public record InstitutionDataDTO : IInstitutionDTO
{
    public string Code { get; init; }
    public string Name { get; init; }
    public string Address { get; init; }

    public InstitutionDataDTO(string code, string name, string address) 
    {
        Code = code;
        Name = name;
        Address = address;
    }
}

public record SaveInstitutionDTO : InstitutionDataDTO 
{
    public IEnumerable<int> ContactIDs { get; init; }
    public IEnumerable<int> FacultyIDs { get; init; }

    public SaveInstitutionDTO(string code, string name, string address, IEnumerable<int> contactIDs, IEnumerable<int> facultyIDs) 
        : base(code, name, address) 
    {
        ContactIDs = contactIDs;
        FacultyIDs = facultyIDs;
    }
}

public record InstitutionBaseDTO : InstitutionDataDTO
{
    public int InstitutionID { get; init; }

    public InstitutionBaseDTO(int institutionID, string code, string name, string address) 
        : base(code, name, address)
    {
        InstitutionID = institutionID;
    }
}

public record InstitutionDTO : InstitutionBaseDTO
{
    public IEnumerable<ContactBaseDTO> Contacts { get; init; }

    public InstitutionDTO(
        int institutionID, 
        string code, 
        string name, string 
        address, 
        IEnumerable<ContactBaseDTO> contacts) : base(institutionID, code, name, address)
    { Contacts = contacts; }
}