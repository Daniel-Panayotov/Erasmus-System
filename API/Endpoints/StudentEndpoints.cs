using API.Endpoints.Handlers;

namespace API.Endpoints;

public static class StudentEndpoints
{
    public static void MapStudentEndpoints(RouteGroupBuilder group)
    {
        group.MapGet("/get", StudentHandlers.Get);
        group.MapPost("/update", StudentHandlers.Update);
    }
}
