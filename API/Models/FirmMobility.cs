namespace API.Models;

public partial class FirmMobility
{
    public int MobilityId { get; set; }

    public int FirmId { get; set; }

    public virtual Firm Firm { get; set; } = null!;

    public virtual Mobility Mobility { get; set; } = null!;
}
