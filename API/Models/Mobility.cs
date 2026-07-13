namespace API.Models;

public partial class Mobility
{
    public int MobilityId { get; set; }

    public string MobilityType { get; set; } = null!;

    public virtual MobilityType MobilityTypeEnum => Enum.Parse<MobilityType>(this.MobilityType);

    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();

    public virtual FacultyMobility? FacultyMobility { get; set; }

    public virtual FirmMobility? FirmMobility { get; set; }
}

public enum MobilityType { Study, Traineeship }