using API.DTOs;

namespace API.DTOs;

public interface IFileDTO
{
    public string FileName { get; }
    public string ContentType { get; }
    public int FileSize { get; }
}

public record FileDataDTO : IFileDTO
{
    public string FileName { get; init; }
    public string ContentType { get; init; }
    public int FileSize { get; init; }

    public FileDataDTO(string fileName, string contentType, int fileSize) 
    { FileName = fileName; ContentType = contentType; FileSize = fileSize; }
}

public record FileBaseDTO : FileDataDTO
{
    public int FileID { get; init; }

    public FileBaseDTO(int fileID, string fileName, string contentType, int fileSize) 
        : base(fileName, contentType, fileSize)
    { FileID = fileID; }
}