using API.Utilities;
using Microsoft.AspNetCore.Authorization;

namespace API.Services.Auth;

public class GeneralAuthorizationHandler : AuthorizationHandler<AuthorizationRequirement>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext ctx, AuthorizationRequirement req)
    {
        bool isAuthenticated = ctx.User?.Identity?.IsAuthenticated ?? false;

        if (isAuthenticated == false && req.JWTRequirment == RequireState.Required)
            ctx.Fail();
        else if (isAuthenticated == true && req.JWTRequirment == RequireState.NotAllowed)
            ctx.Fail();
        else
            ctx.Succeed(req);

        return Task.CompletedTask;
    }
}
