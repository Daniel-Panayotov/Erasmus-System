using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Admin
{
    public int AdminId { get; set; }

    public string Password { get; set; } = null!;
}
