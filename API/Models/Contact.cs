namespace API.Models;

public partial class Contact
{
    public int ContactId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public virtual ICollection<Faculty> Faculties { get; set; } = new List<Faculty>();

    public virtual ICollection<FacultyMobility> FacultyMobilities { get; set; } = new List<FacultyMobility>();

    public virtual ICollection<Firm> Firms { get; set; } = new List<Firm>();
}
