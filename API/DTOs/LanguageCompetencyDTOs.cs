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

public record LanguageCompetencyDTO : LanguageCompetencyBaseDTO
{
    public FileBaseDTO? CertificateBase { get; init; }

    public LanguageCompetencyDTO(
        int languageCompetencyID,
        string language,
        CompetencyLevel competencyLevel,
        bool canFollowLectures,
        bool canFollowLecturesWithLessons,
        FileBaseDTO? certificateBase
    ) : base(languageCompetencyID, language, competencyLevel, canFollowLectures, canFollowLecturesWithLessons)
    { CertificateBase = certificateBase; }
}

public record SaveLanguageCompetencyDTO (
    string Language,
    CompetencyLevel CompetencyLevel,
    IFormFile? Certificate,
    bool CanFollowLectures,
    bool CanFollowLecturesWithLessons
);