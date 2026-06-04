using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Institution
{
    public int InstitutionId { get; set; }

    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Address { get; set; } = null!;

    public virtual ICollection<Application> ApplicationReceivingInstitutionNavigations { get; set; } = new List<Application>();

    public virtual ICollection<Application> ApplicationSendingInstitutionNavigations { get; set; } = new List<Application>();

    public virtual ICollection<Contact> Contacts { get; set; } = new List<Contact>();

    public virtual ICollection<Faculty> Faculties { get; set; } = new List<Faculty>();
}
