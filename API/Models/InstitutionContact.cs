using System;
using System.Collections.Generic;

namespace API.Models;

public partial class InstitutionContact
{
    public int ContactId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public int InstitutionId { get; set; }

    public virtual Institution Institution { get; set; } = null!;
}
