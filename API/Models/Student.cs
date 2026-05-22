using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Student
{
    public int StudentId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public DateOnly BirthDate { get; set; }

    public string Nationality { get; set; } = null!;

    public string CurrentAddress { get; set; } = null!;

    public string PermanentAddress { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public int UserId { get; set; }

    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();

    public virtual ICollection<LanguageCompetency> LanguageCompetencies { get; set; } = new List<LanguageCompetency>();

    public virtual User User { get; set; } = null!;
}
