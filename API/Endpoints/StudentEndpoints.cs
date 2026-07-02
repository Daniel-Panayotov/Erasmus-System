using API.Endpoints.Handlers;
using API.Utilities;
using API.Models;

namespace API.Endpoints;

public static class StudentEndpoints
{
    public static void MapStudentEndpoints(RouteGroupBuilder group)
    {
        group.MapGet("/get", StudentHandlers.Get).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapPost("/create", StudentHandlers.Create).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapPost("/update", StudentHandlers.Update).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
    }
}
