namespace API.DTOs;

public record ContactDataDTO
(
    string FirstName,
    string LastName,
    string Phone,
    string Email
);

public record ContactBaseDTO
(
    int contactID,
    ContactDataDTO DataDTO
);
