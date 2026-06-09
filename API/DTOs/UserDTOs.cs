namespace API.DTOs;

public interface IUserDTO
{
    public string Email { get; }
    public string Password { get; }
}

public record UserDataDTO : IUserDTO
{
    public string Email { get; init; }
    public string Password { get; init; }

    public UserDataDTO(string email, string password)
    {
        Email = email;
        Password = password;
    }
}

public record UserBaseDTO : UserDataDTO, IDTO
{
    public int UserID { get; init; }

    public UserBaseDTO(int userID, string email, string password) : base(email, password)
    {
        UserID = userID;
    }

    public int GetID() => UserID;
}

public record UserToken
{
    public int UserID { get; init; }
    public string Email { get; init; }

    public UserToken (int userID, string email)
    {
        UserID = userID;
        Email = email;
    }
}