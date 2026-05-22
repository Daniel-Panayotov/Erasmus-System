using System.Security.Claims;

namespace API.Endpoints.Handlers;

public class AuthenticationHandlers
{
    public static async Task<IResult> LoginHandler()
    {

        return Results.Ok();
    }

    public static async Task<IResult> RegisterHandler()
    {

        return Results.Ok();
    }

    public static async Task<IResult> RefreshHandler()
    {
        
        return Results.Ok();
    }
}
