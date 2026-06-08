using Microsoft.AspNetCore.Authorization;

namespace API.Utilities;

public class AuthorizationRequirement : IAuthorizationRequirement
{
    public RequireState JWTRequirment { get; }

    public AuthorizationRequirement(RequireState jwtRequirment)
    {
        JWTRequirment = jwtRequirment;
    }
}

public enum RequireState
{
    Disregarded = 0,
    NotAllowed = 1,
    Required = 2
}