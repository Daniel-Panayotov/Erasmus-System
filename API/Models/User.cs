namespace API.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public virtual ICollection<HashedRefreshToken> HashedRefreshTokens { get; set; } = new List<HashedRefreshToken>();

    public virtual Student? Student { get; set; }
}
