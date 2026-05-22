using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Institution
{
    public int InstitutionId { get; set; }

    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Address { get; set; } = null!;

    public virtual ICollection<Application> ApplicationReceivingInstitutions { get; set; } = new List<Application>();

    public virtual ICollection<Application> ApplicationSendingInstitutions { get; set; } = new List<Application>();

    public virtual ICollection<InstitutionContact> InstitutionContacts { get; set; } = new List<InstitutionContact>();

    public virtual ICollection<InstitutionFaculty> InstitutionFaculties { get; set; } = new List<InstitutionFaculty>();

    public virtual ICollection<StudyForInstitution> StudyForInstitutions { get; set; } = new List<StudyForInstitution>();
}
