using API.Endpoints.Handlers;

namespace API.Endpoints;

public static class AuthenticationEndpoints
{
    public static void MapAuthenticationEndpoints(RouteGroupBuilder group)
    {
        group.MapPost("/login", AuthenticationHandlers.LoginHandler);
        group.MapPost("/register", AuthenticationHandlers.RegisterHandler);
        group.MapPost("/refresh", AuthenticationHandlers.RefreshHandler);
    }
}
