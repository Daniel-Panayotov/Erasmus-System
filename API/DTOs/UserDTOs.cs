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

public record UserDTO : UserBaseDTO
{
    public StudentBaseDTO? Student { get; init; }

    public UserDTO(int userID, string email, string password, StudentBaseDTO? student) : base(userID, email, password)
    {
        Student = student;
    }
}

public record SafeUserDTO
{
    public int UserID { get; init; }
    public string Email { get; init; }
    public StudentBaseDTO? Student { get; init; } 

    public SafeUserDTO (int userID, string email, StudentBaseDTO? student)
    {
        UserID = userID;
        Email = email;
        Student = student;
    }
}