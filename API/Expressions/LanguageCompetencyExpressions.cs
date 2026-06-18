using API.DTOs;
using API.Models;
using System.Linq.Expressions;

namespace API.Expressions;

public class LanguageCompetencyExpressions
{
    public readonly static Expression<Func<LanguageCompetency, LanguageCompetencyBaseDTO>> Base =
        l => new LanguageCompetencyBaseDTO(
            l.LanguageCompetencyId,
            l.Language,
            l.CanFollowLectures,
            l.CanFollowLecturesWithLessons
        );
}
