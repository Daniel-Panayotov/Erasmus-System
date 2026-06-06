using API.Endpoints.Handlers;

namespace API.Endpoints;

public static class AuthenticationEndpoints
{
    public static void MapAuthenticationEndpoints(RouteGroupBuilder group)
    {
        group.MapPost("/login", AuthenticationHandlers.Login);
        group.MapPost("/register", AuthenticationHandlers.Register);
        group.MapPost("/refresh", AuthenticationHandlers.Refresh);
    }
}
