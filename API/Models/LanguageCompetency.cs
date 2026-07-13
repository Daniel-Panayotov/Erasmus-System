namespace API.Models;

public partial class LanguageCompetency
{
    public int LanguageCompetencyId { get; set; }

    public string Language { get; set; } = null!;

    public CompetencyLevel CompetencyLevel { get; set; }

    public bool CanFollowLectures { get; set; }

    public bool CanFollowLecturesWithLessons { get; set; }

    public int StudentId { get; set; }

    public int? CertificateId { get; set; }

    public virtual File? Certificate { get; set; }

    public virtual Student Student { get; set; } = null!;
}

public enum CompetencyLevel { A1, A2, B1, B2, C1, C2 }