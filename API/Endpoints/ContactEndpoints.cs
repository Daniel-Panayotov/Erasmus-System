using API.Endpoints.Handlers;
using API.Utilities;
using API.Models;

namespace API.Endpoints;

public class ContactEndpoints
{
    public static void MapContactEndpoints(RouteGroupBuilder group)
    {
        group.MapGet("/get-one", ContactHandlers.GetOne).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapGet("/get-all", ContactHandlers.GetAll).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapPost("/create", ContactHandlers.Create).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapPost("/update", ContactHandlers.Update).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapDelete("/delete", ContactHandlers.Delete).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
    }
}
