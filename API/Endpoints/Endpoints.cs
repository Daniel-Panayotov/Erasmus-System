namespace API.Endpoints;

public static class Endpoints
{
    public static void RegisterEndpoints(this WebApplication app)
    {
        AuthenticationEndpoints.MapAuthenticationEndpoints(app.MapGroup("/auth"));
        StudentEndpoints.MapStudentEndpoints(app.MapGroup("/students"));
        LanguageCompetencyEndpoints.MapLanguageCompetencyEndpoints(app.MapGroup("/language-competencies"));
        ApplicationEndpoints.MapApplicationEndpoints(app.MapGroup("/applications"));
        ContactEndpoints.MapContactEndpoints(app.MapGroup("/contacts"));
        UniversityEndpoints.MapUniversityEndpoints(app.MapGroup("/universities"));
    }
}
