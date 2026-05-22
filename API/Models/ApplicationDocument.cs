using API.Models;
using System;
using System.Collections.Generic;

namespace API;

public partial class ApplicationDocument
{
    public int ApplicationDocumentId { get; set; }

    public byte[] Application { get; set; } = null!;

    public string Status { get; set; } = null!;

    public int ApplicationId { get; set; }

    public virtual Application ApplicationNavigation { get; set; } = null!;
}
