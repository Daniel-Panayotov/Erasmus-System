using API.DTOs;
using API.Models;
using LinqKit;
using System.Linq.Expressions;

namespace API.Expressions;

public class LanguageCompetencyExpressions
{
    public readonly static Expression<Func<LanguageCompetency, LanguageCompetencyDataDTO>> Data =
        l => new LanguageCompetencyDataDTO(
            l.Language,
            l.CompetencyLevel,
            l.CanFollowLectures,
            l.CanFollowLecturesWithLessons
        );


    public readonly static Expression<Func<LanguageCompetency, LanguageCompetencyBaseDTO>> Base =
        l => new LanguageCompetencyBaseDTO(
            l.LanguageCompetencyId,
            LanguageCompetencyExpressions.Data.Invoke(l)
        );

    public readonly static Expression<Func<LanguageCompetency, LanguageCompetencyDTO>> DTO =
        l => new LanguageCompetencyDTO(
            l.Certificate != null ? FileExpressions.Base.Invoke(l.Certificate) : null,
            LanguageCompetencyExpressions.Base.Invoke(l)
        );
}
