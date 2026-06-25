namespace API.Endpoints;

public static class Endpoints
{
    public static void RegisterEndpoints(this WebApplication app)
    {
        AuthenticationEndpoints.MapAuthenticationEndpoints(app.MapGroup("/auth"));
        StudentEndpoints.MapStudentEndpoints(app.MapGroup("/students"));
        ApplicationEndpoints.MapApplicationEndpoints(app.MapGroup("/applications"));
        LanguageCompetencyEndpoints.MapLanguageCompetencyEndpoints(app.MapGroup("/language-competencies"));
        ContactEndpoints.MapContactEndpoints(app.MapGroup("/contacts"));
        InstitutionEndpoints.MapInstitutionEndpoints(app.MapGroup("/institutions"));
    }
}
