namespace API.DTOs;

public record UserDataDTO
(
    string Email,
    string Password
);

public record UserBaseDTO
(
    int UserID,
    UserDataDTO DataDTO
);

public record UserDTO
(
    StudentBaseDTO? Student,
    UserBaseDTO BaseDTO
);

public record SafeUserDTO
(
    int UserID,
    string Email,
    StudentBaseDTO? Student
);
