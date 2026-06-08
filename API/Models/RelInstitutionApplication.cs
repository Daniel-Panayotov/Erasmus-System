namespace API.Models;

public partial class RelInstitutionApplication
{
    public int InstitutionApplicationId { get; set; }

    public int ApplicationId { get; set; }

    public int ContactId { get; set; }

    public int DisciplineId { get; set; }

    public virtual Application Application { get; set; } = null!;

    public virtual Contact Contact { get; set; } = null!;

    public virtual Discipline Discipline { get; set; } = null!;

    public virtual ICollection<RelInstitutionApplicationSubject> RelInstitutionApplicationSubjects { get; set; } = new List<RelInstitutionApplicationSubject>();
}
