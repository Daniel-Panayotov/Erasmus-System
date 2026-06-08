namespace API.DTOs;

public record AppSettingsConfig
{
    public string ApplicationUrl { get; set; } = string.Empty;
    public JWTConfig JWT { get; set; } = new();

}

public record JWTConfig
{
    public int AccessTokenExpireMinutes { get; set; } = 30;
    public int RefreshTokenExpireDays { get; set; } = 7;
    public string RefreshTokenKey { get; set; } = string.Empty;
    public string AccessTokenKey { get; set; } = string.Empty;
    public string Secret { get; set; } = string.Empty;
}