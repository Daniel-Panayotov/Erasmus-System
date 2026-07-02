using API.Endpoints.Handlers;
using API.Utilities;
using API.Models;

namespace API.Endpoints;

public static class AuthenticationEndpoints
{
    public static void MapAuthenticationEndpoints(RouteGroupBuilder group)
    {
        group.MapPost("/login", AuthenticationHandlers.Login).RequireAuthorization(AuthorizationPolicies.No_Token);
        group.MapPost("/register", AuthenticationHandlers.Register).RequireAuthorization(AuthorizationPolicies.No_Token);
        group.MapPost("/logout", AuthenticationHandlers.Logout).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Refresh));
        group.MapPost("/refresh", AuthenticationHandlers.Refresh).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Refresh));
    }
}
