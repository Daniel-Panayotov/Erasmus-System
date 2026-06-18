namespace API.DTOs;

public interface ILanguageCompetencyDTO
{
    public string Language { get; } 
    public bool CanFollowLectures { get; }
    public bool CanFollowLecturesWithLessons { get; }
}

public record LanguageCompetencyDataDTO : ILanguageCompetencyDTO
{
    public string Language { get; init; }
    public bool CanFollowLectures { get; init; }
    public bool CanFollowLecturesWithLessons { get; init; }

    public LanguageCompetencyDataDTO(
        string language,
        bool canFollowLectures,
        bool canFollowLecturesWithLessons
    )
    {
        Language = language;
        CanFollowLectures = canFollowLectures;
        CanFollowLecturesWithLessons = canFollowLecturesWithLessons;
    }
}

public record LanguageCompetencyBaseDTO : LanguageCompetencyDataDTO, IDTO
{
    public int LanguageCompetencyID { get; init; }

    public LanguageCompetencyBaseDTO (
        int languageCompetencyID,
        string language,
        bool canFollowLectures,
        bool canFollowLecturesWithLessons
    ) : base( language, canFollowLectures, canFollowLecturesWithLessons) 
    {
        LanguageCompetencyID = languageCompetencyID;
    }

    public int GetID() => LanguageCompetencyID;
}