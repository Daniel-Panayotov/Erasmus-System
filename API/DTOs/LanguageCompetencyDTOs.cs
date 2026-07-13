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

public record SaveLanguageCompetencyDTO (
    string Language,
    CompetencyLevel CompetencyLevel,
    IFormFile? Certificate,
    bool CanFollowLectures,
    bool CanFollowLecturesWithLessons
);