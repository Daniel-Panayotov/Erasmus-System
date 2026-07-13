using API.Models;

namespace API.DTOs;

public record LanguageCompetencyDataDTO
(
    string Language,
    CompetencyLevel CompetencyLevel,
    bool CanFollowLectures,
    bool CanFollowLecturesWithLessons
);

public record LanguageCompetencyBaseDTO
(
    int LanguageCompetencyID,
    LanguageCompetencyDataDTO DataDTO
);

public record LanguageCompetencyDTO
(
    FileBaseDTO? CertificateBase,
    LanguageCompetencyBaseDTO BaseDTO
);

public class SaveLanguageCompetencyDTO
{
    public string Language { get; set; }
    public CompetencyLevel CompetencyLevel { get; set; }
    public IFormFile? Certificate { get; set; }
    public bool CanFollowLectures { get; set; }
    public bool CanFollowLecturesWithLessons { get; set; }
};