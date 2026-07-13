using API.Models;

namespace API.DTOs;

public interface ILanguageCompetencyDTO
{
    public string Language { get; }
    public CompetencyLevel CompetencyLevel { get; }
    public bool CanFollowLectures { get; }
    public bool CanFollowLecturesWithLessons { get; }
}

public record LanguageCompetencyDataDTO : ILanguageCompetencyDTO
{
    public string Language { get; init; }
    public CompetencyLevel CompetencyLevel { get; init; }
    public bool CanFollowLectures { get; init; }
    public bool CanFollowLecturesWithLessons { get; init; }

    public LanguageCompetencyDataDTO(
        string language,
        CompetencyLevel competencyLevel,
        bool canFollowLectures,
        bool canFollowLecturesWithLessons
    )
    {
        Language = language;
        CompetencyLevel = competencyLevel;
        CanFollowLectures = canFollowLectures;
        CanFollowLecturesWithLessons = canFollowLecturesWithLessons;
    }
}

public record LanguageCompetencyBaseDTO : LanguageCompetencyDataDTO
{
    public int LanguageCompetencyID { get; init; }

    public LanguageCompetencyBaseDTO (
        int languageCompetencyID,
        string language,
        CompetencyLevel competencyLevel,
        bool canFollowLectures,
        bool canFollowLecturesWithLessons
    ) : base(language, competencyLevel, canFollowLectures, canFollowLecturesWithLessons) 
    {
        LanguageCompetencyID = languageCompetencyID;
    }
}

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