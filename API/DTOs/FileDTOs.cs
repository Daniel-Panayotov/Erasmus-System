namespace API.DTOs;

public record FileDataDTO
(
    string FileName,
    string ContentType,
    int FileSize
);

public record FileBaseDTO
(
    int FileID,
    FileDataDTO DataDTO
);
