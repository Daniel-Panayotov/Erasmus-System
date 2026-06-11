using API.Models;

namespace API.DTOs;

public interface IApplicationDTO
{
    public byte[] Photo { get; init; }
    public MobilityType MobilityType { get; init; }
    public DateOnly StudyFrom { get; init; }
    public DateOnly StudyTo { get; init; }
    public bool Accommodation { get; init; }
    public DateOnly? AccommodationFrom { get; init; }
    public DateOnly? AccommodationTo { get; init; }
    public bool BulgarianCourse { get; init; }
    public string? MotivationText { get; init; }
    public Degree Degree { get; init; }
    public bool PriorStudyAbroad { get; init; }
    public int? PriorStudyDuration { get; init; }
}

public record ApplicationDataDTO : IApplicationDTO
{
    public byte[] Photo { get; init; }
    public MobilityType MobilityType { get; init; }
    public DateOnly StudyFrom { get; init; }
    public DateOnly StudyTo { get; init; }
    public bool Accommodation { get; init; }
    public DateOnly? AccommodationFrom { get; init; }
    public DateOnly? AccommodationTo { get; init; }
    public bool BulgarianCourse { get; init; }
    public string? MotivationText { get; init; }
    public Degree Degree { get; init; }
    public bool PriorStudyAbroad { get; init; }
    public int? PriorStudyDuration { get; init; }

    public ApplicationDataDTO(
        byte[] photo, 
        MobilityType mobilityType, 
        DateOnly studyFrom, 
        DateOnly studyTo, 
        bool accommodation,
        DateOnly? accommodationFrom,
        DateOnly? accommodationTo,
        bool bulgarianCourse,
        string? motivationText,
        Degree degree,
        bool priorStudyAbroad,
        int? priorStudyDuration)
    {
        Photo = photo;
        MobilityType = mobilityType;
        StudyFrom = studyFrom;
        StudyTo = studyTo;
        Accommodation = accommodation;
        AccommodationFrom = accommodationFrom;
        AccommodationTo = accommodationTo;
        BulgarianCourse = bulgarianCourse;
        MotivationText = motivationText;
        Degree = degree;
        PriorStudyAbroad = priorStudyAbroad;
        PriorStudyDuration = priorStudyDuration;
    }
}

public record ApplicationExtendedDataDTO : ApplicationDataDTO
{
    public int SendingInstitution { get; init; }
    public int ReceivingInstitution { get; init; }

    public ApplicationExtendedDataDTO(
        byte[] photo,
        MobilityType mobilityType,
        DateOnly studyFrom,
        DateOnly studyTo,
        bool accommodation,
        DateOnly? accommodationFrom,
        DateOnly? accommodationTo,
        bool bulgarianCourse,
        string? motivationText,
        Degree degree,
        bool priorStudyAbroad,
        int? priorStudyDuration,
        int sendingInstitution,
        int receivingInstitution) : base(
            photo,
            mobilityType,
            studyFrom,
            studyTo,
            accommodation,
            accommodationFrom,
            accommodationTo,
            bulgarianCourse,
            motivationText,
            degree,
            priorStudyAbroad,
            priorStudyDuration)
    {
        SendingInstitution = sendingInstitution;
        ReceivingInstitution = receivingInstitution;
    }
}

public record ApplicationBaseDTO : ApplicationDataDTO, IDTO
{
    public int ApplicationID { get; init; }

    public ApplicationBaseDTO(
        int applicationID,
        byte[] photo,
        MobilityType mobilityType,
        DateOnly studyFrom,
        DateOnly studyTo,
        bool accommodation,
        DateOnly? accommodationFrom,
        DateOnly? accommodationTo,
        bool bulgarianCourse,
        string? motivationText,
        Degree degree,
        bool priorStudyAbroad,
        int? priorStudyDuration) : base(
            photo,
            mobilityType,
            studyFrom,
            studyTo,
            accommodation,
            accommodationFrom,
            accommodationTo,
            bulgarianCourse,
            motivationText,
            degree,
            priorStudyAbroad,
            priorStudyDuration)
    { ApplicationID = applicationID; }

    public int GetID() => ApplicationID;
}

public record NewApplicationDTO (
    IFormFile photo,
    MobilityType mobilityType,
    DateOnly studyFrom,
    DateOnly studyTo,
    bool accommodation,
    DateOnly? accommodationFrom,
    DateOnly? accommodationTo,
    bool bulgarianCourse,
    string? motivationText,
    Degree degree,
    bool priorStudyAbroad,
    int priorStudyDuration);