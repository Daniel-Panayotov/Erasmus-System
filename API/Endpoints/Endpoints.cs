namespace API.Endpoints;

public static class Endpoints
{
    public static void RegisterEndpoints(this WebApplication app)
    {
        AuthenticationEndpoints.MapAuthenticationEndpoints(app.MapGroup("/auth"));
        ProfileEndpoints.MapProfileEndpoints(app.MapGroup("/users/profile"));
    }
}
