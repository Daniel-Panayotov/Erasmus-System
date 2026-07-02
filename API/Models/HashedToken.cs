namespace API.Models;

public partial class HashedToken
{
    public int HashedTokenId { get; set; }

    public string TokenType { get; set; } = null!;

    public string Token { get; set; } = null!;

    public DateTime ExpiresAt { get; set; }

    public virtual TokenType TokenTypeEnum => Enum.Parse<TokenType>(this.TokenType);

    public int UserId { get; set; }

    public virtual User User { get; set; } = null!;
}

public enum TokenType { Refresh, Access }