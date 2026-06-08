namespace API.Models;

public partial class HashedRefreshToken
{
    public int HashedRefreshTokenId { get; set; }

    public string HashedToken { get; set; } = null!;

    public DateTime ExpiresAt { get; set; }

    public int UserId { get; set; }

    public virtual User User { get; set; } = null!;
}
