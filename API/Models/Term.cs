namespace API.Models;

public partial class Term
{
    public int TermId { get; set; }

    public string Name { get; set; } = null!;

    public DateOnly ApplicationDeadline { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();
}
