using API.DTOs;
using API.Models;
using System.Linq.Expressions;

namespace API.Expressions;

public class ApplicationExpressions
{
    public readonly static Expression<Func<Application, ApplicationBaseDTO>> Base =
        a => new ApplicationBaseDTO(
            applicationID: a.ApplicationId,
            studyFrom: a.StudyFrom,
            studyTo: a.StudyTo,
            accommodation: a.Accommodation,
            accommodationFrom: a.AccommodationFrom,
            accommodationTo: a.AccommodationTo,
            bulgarianCourse: a.BulgarianCourse,
            motivationText: a.MotivationText,
            degree: a.DegreeEnum
        );
}
