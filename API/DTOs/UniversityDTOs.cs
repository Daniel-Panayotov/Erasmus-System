namespace API.DTOs;

public record UniversityDataDTO
(
    string Code,
    string Name,
    string Address
);

public record UniversityBaseDTO
(
    int UniversityID,
    UniversityDataDTO DataDTO
);