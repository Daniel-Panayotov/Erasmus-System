using API.Models;

namespace API.DTOs;

public interface IApplicationDTO
{
    public DateOnly StudyFrom { get; init; }
    public DateOnly StudyTo { get; init; }
    public bool Accommodation { get; init; }
    public DateOnly? AccommodationFrom { get; init; }
    public DateOnly? AccommodationTo { get; init; }
    public bool BulgarianCourse { get; init; }
    public string? MotivationText { get; init; }
    public Degree Degree { get; init; }
}

public record ApplicationDataDTO : IApplicationDTO
{
    public DateOnly StudyFrom { get; init; }
    public DateOnly StudyTo { get; init; }
    public bool Accommodation { get; init; }
    public DateOnly? AccommodationFrom { get; init; }
    public DateOnly? AccommodationTo { get; init; }
    public bool BulgarianCourse { get; init; }
    public string? MotivationText { get; init; }
    public Degree Degree { get; init; }

    public ApplicationDataDTO(
        DateOnly studyFrom, 
        DateOnly studyTo, 
        bool accommodation,
        DateOnly? accommodationFrom,
        DateOnly? accommodationTo,
        bool bulgarianCourse,
        string? motivationText,
        Degree degree)
    {
        StudyFrom = studyFrom;
        StudyTo = studyTo;
        Accommodation = accommodation;
        AccommodationFrom = accommodationFrom;
        AccommodationTo = accommodationTo;
        BulgarianCourse = bulgarianCourse;
        MotivationText = motivationText;
        Degree = degree;
    }
}

public record ApplicationExtendedDataDTO : ApplicationDataDTO
{
    public int SendingInstitution { get; init; }
    public int ReceivingInstitution { get; init; }

    public ApplicationExtendedDataDTO(
        DateOnly studyFrom,
        DateOnly studyTo,
        bool accommodation,
        DateOnly? accommodationFrom,
        DateOnly? accommodationTo,
        bool bulgarianCourse,
        string? motivationText,
        Degree degree,
        int sendingInstitution,
        int receivingInstitution) : base(
            studyFrom,
            studyTo,
            accommodation,
            accommodationFrom,
            accommodationTo,
            bulgarianCourse,
            motivationText,
            degree)
    {
        SendingInstitution = sendingInstitution;
        ReceivingInstitution = receivingInstitution;
    }
}

public record ApplicationBaseDTO : ApplicationDataDTO
{
    public int ApplicationID { get; init; }

    public ApplicationBaseDTO(
        int applicationID,
        DateOnly studyFrom,
        DateOnly studyTo,
        bool accommodation,
        DateOnly? accommodationFrom,
        DateOnly? accommodationTo,
        bool bulgarianCourse,
        string? motivationText,
        Degree degree) : base(
            studyFrom,
            studyTo,
            accommodation,
            accommodationFrom,
            accommodationTo,
            bulgarianCourse,
            motivationText,
            degree)
    { ApplicationID = applicationID; }
}

public record NewApplicationDTO (
    IFormFile photo,
    DateOnly studyFrom,
    DateOnly studyTo,
    bool accommodation,
    DateOnly? accommodationFrom,
    DateOnly? accommodationTo,
    bool bulgarianCourse,
    string? motivationText,
    Degree degree);