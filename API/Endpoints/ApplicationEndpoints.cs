using API.Endpoints.Handlers;
using API.Models;
using API.Utilities;

namespace API.Endpoints;

public class ApplicationEndpoints
{
    public static void MapApplicationEndpoints(RouteGroupBuilder group)
    {
        group.MapGet("/get-all", ApplicationHandlers.Get);
        group.MapPost("/create", ApplicationHandlers.Create)
            .RequireAuthorization(AuthorizationPolicies.Yes_Token)
            .WithMetadata(new JWTTypeAttribute(TokenType.Access))
            .DisableAntiforgery();
    }
}
