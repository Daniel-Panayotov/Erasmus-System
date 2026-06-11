using API.Utilities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Encodings.Web;

namespace API.Services.Auth;

public class JWTAuthenticationHandler(
    IOptionsMonitor<AuthenticationSchemeOptions> options,
    ILoggerFactory logger,
    UrlEncoder encoder,
    IConfigStore configStore,
    JWTService jwtService
) : AuthenticationHandler<AuthenticationSchemeOptions>(options, logger, encoder)
{
    private readonly IConfigStore _configStore = configStore;

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        try
        {
            if (Request.Cookies.Count == 0) return AuthenticateResult.NoResult();

            var endpoint = Context.GetEndpoint();

            // Get JWT type from endpoint metadata
            var jwtType = endpoint?.Metadata.GetMetadata<JWTTypeAttribute>();
            if (jwtType == null) return AuthenticateResult.NoResult();

            var jwtConfig = _configStore.JwtConfig;

            if (!Request.Cookies.TryGetValue(jwtType.TokenType == TokenType.Access ?
                jwtConfig.AccessTokenKey :
                jwtConfig.RefreshTokenKey,
            out var token)) return AuthenticateResult.Fail("Required token was not included.");

            // setup validation parameters
            TokenValidationParameters parameters = new()
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _configStore.GetSecurityKey(),
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero,
                ValidateIssuer = true,
                ValidIssuer = _configStore.ApplicationUrl,
                ValidateAudience = true,
                ValidAudience = jwtType.TokenType == TokenType.Access ? jwtConfig.AudienceAccess : jwtConfig.AudienceRefresh,
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, parameters, out var validatedToken);

            if (jwtType.TokenType == TokenType.Refresh)
            {
                bool isRefreshTokenValid = await jwtService.ValidateRefreshTokenAgainstHash(principal, token);
                if (!isRefreshTokenValid) return AuthenticateResult.Fail("Invalid token.");
            } else
            {
                bool isIdentityValid = await jwtService.ValidateTokenIdentity(principal);
                if (!isIdentityValid) return AuthenticateResult.Fail("Invalid identity.");
            }

            var ticket = new AuthenticationTicket(principal, Scheme.Name);
            return AuthenticateResult.Success(ticket);
        }
        catch (SecurityTokenException ex)
        {
            return AuthenticateResult.Fail(ex);
        }
    }
}
