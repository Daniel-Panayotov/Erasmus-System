namespace API.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public virtual ICollection<HashedToken> HashedTokens { get; set; } = new List<HashedToken>();

    public virtual Student? Student { get; set; }
}
