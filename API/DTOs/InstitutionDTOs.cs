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

public record InstitutionBaseDTO : InstitutionDataDTO
{
    public int InstitutionID { get; init; }

    public InstitutionBaseDTO(int institutionID, string code, string name, string address) 
        : base(code, name, address)
    {
        InstitutionID = institutionID;
    }
}