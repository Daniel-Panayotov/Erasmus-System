using API.Endpoints.Handlers;
using API.Utilities;

namespace API.Endpoints;

public class LanguageCompetencyEndpoints
{
    public static void MapLanguageCompetencyEndpoints(RouteGroupBuilder group)
    {
        group.MapGet("/get-all", LanguageCompetencyHandlers.GetAll).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapPost("/create", LanguageCompetencyHandlers.Create).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapPost("/update", LanguageCompetencyHandlers.Update).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
    }
}
