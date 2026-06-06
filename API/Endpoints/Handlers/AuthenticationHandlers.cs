using System.Security.Claims;

namespace API.Endpoints.Handlers;

public class AuthenticationHandlers
{
    public static async Task<IResult> Login()
    {

        return Results.Ok();
    }

    public static async Task<IResult> Register()
    {

        return Results.Ok();
    }

    public static async Task<IResult> Refresh()
    {
        
        return Results.Ok();
    }
}
