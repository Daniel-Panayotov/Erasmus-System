namespace API.Models;

public partial class Firm
{
    public int FirmId { get; set; }

    public string Name { get; set; } = null!;

    public string Address { get; set; } = null!;

    public int? ContactId { get; set; }

    public virtual Contact? Contact { get; set; }

    public virtual ICollection<FirmMobility> FirmMobilities { get; set; } = new List<FirmMobility>();
}
