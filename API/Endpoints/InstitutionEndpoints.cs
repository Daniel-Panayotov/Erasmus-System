using API.Endpoints.Handlers;
using API.Utilities;

namespace API.Endpoints;

public class InstitutionEndpoints
{
    public static void MapInstitutionEndpoints(RouteGroupBuilder group)
    {
        group.MapGet("/get-one", InstitutionHandlers.GetOne).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapPost("/get-all", InstitutionHandlers.GetAll).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapPost("/create", InstitutionHandlers.Create).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapPost("/update", InstitutionHandlers.Update).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapDelete("/delete", InstitutionHandlers.Delete).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
    }
}
