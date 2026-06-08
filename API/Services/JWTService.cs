using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace API.Services;

public class JWTService(IConfigStore configStore, ICryptographicService crypto, IServiceProvider provider)
{
    private readonly IConfigStore _configStore = configStore;
    private readonly ICryptographicService _cryptoService = crypto;
    private readonly IServiceProvider _provider = provider;

    public string GenerateAccessToken(string userID, IEnumerable<Claim> sentClaims)
    {
        var handler = new JwtSecurityTokenHandler();
        
        ClaimsIdentity claims = new();
        claims.AddClaims([
            new Claim(ClaimTypes.NameIdentifier, userID)
        ]);

        claims.AddClaims(sentClaims);

        var securityKey = _configStore.GetSecurityKey();
        var jwtConfig = _configStore.JwtConfig;
        string appUrl = _configStore.ApplicationUrl;

        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        JwtSecurityToken token = handler.CreateJwtSecurityToken(
            appUrl,
            jwtConfig.AudienceAccess,
            claims,
            DateTime.UtcNow,
            DateTime.UtcNow.AddMinutes(jwtConfig.AccessTokenExpireMinutes),
            DateTime.UtcNow,
            credentials
        );
        string signedToken = handler.WriteToken(token);

        return signedToken;
    }


    public string GenerateRefreshToken(string userID)
    {
        var handler = new JwtSecurityTokenHandler();

        ClaimsIdentity claims = new();
        claims.AddClaims([ new Claim(ClaimTypes.NameIdentifier, userID) ]);

        var securityKey = _configStore.GetSecurityKey();
        var jwtConfig = _configStore.JwtConfig;
        string appUrl = _configStore.ApplicationUrl;

        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        JwtSecurityToken token = handler.CreateJwtSecurityToken(
            appUrl,
            jwtConfig.AudienceRefresh,
            claims,
            DateTime.UtcNow,
            DateTime.UtcNow.AddDays(jwtConfig.RefreshTokenExpireDays),
            DateTime.UtcNow,
            credentials
        );
        string signedToken = handler.WriteToken(token);

        return signedToken;
    }

    public async Task<bool> ValidateRefreshTokenAgainstHash(string userID, string token)
    {
        using var scope = _provider.CreateScope();
        var ctx = scope.ServiceProvider.GetRequiredService<UEMSContext>();

        var query = ctx.HashedRefreshTokens.Where(t => t.UserId.Equals(userID));
        if (await query.AnyAsync() == false) return false;

        var tokenEntries = await query.ToListAsync();

        string tokenHash = _cryptoService.ComputeHash(token);

        bool isTokenValid = tokenEntries.Where(t => t.HashedToken.Equals(tokenHash)).Any();

        return isTokenValid;
    }
}
