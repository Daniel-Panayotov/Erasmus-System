using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Application
{
    public int ApplicationId { get; set; }

    public byte[]? Photo { get; set; }

    public string MobilityType { get; set; } = null!;

    public string StudyFieldCode { get; set; } = null!;

    public DateOnly StudyFrom { get; set; }

    public DateOnly StudyTo { get; set; }

    public byte ExpectedCredits { get; set; }

    public bool Accommodation { get; set; }

    public DateOnly? AccommodationFrom { get; set; }

    public DateOnly? AccommodationTo { get; set; }

    public bool BulgarianCourse { get; set; }

    public string MotivationText { get; set; } = null!;

    public string Degree { get; set; } = null!;

    public byte PriorStudyDuration { get; set; }

    public bool StudiedAbroad { get; set; }

    public int StudentId { get; set; }

    public int SendingInstitutionId { get; set; }

    public int ReceivingInstitutionId { get; set; }

    public virtual ICollection<ApplicationDocument> ApplicationDocuments { get; set; } = new List<ApplicationDocument>();

    public virtual Institution ReceivingInstitution { get; set; } = null!;

    public virtual Institution SendingInstitution { get; set; } = null!;

    public virtual Student Student { get; set; } = null!;

    public virtual ICollection<StudyForInstitution> StudyForInstitutions { get; set; } = new List<StudyForInstitution>();

    public virtual ICollection<WorkExperience> WorkExperiences { get; set; } = new List<WorkExperience>();
}
