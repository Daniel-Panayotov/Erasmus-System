using API.Endpoints.Handlers;

namespace API.Endpoints;

public static class ProfileEndpoints
{
    public static void MapProfileEndpoints(RouteGroupBuilder group)
    {
        group.MapPost("/update", ProfileHandlers.UpdateHandler);
    }
}
