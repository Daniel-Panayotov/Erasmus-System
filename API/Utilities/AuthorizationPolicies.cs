namespace API.Utilities;

public static class AuthorizationPolicies
{
    public static string Yes_Token => "Yes_Token";
    public static string No_Token => "No_Token";
    public static string IDC_Token => "IDC_Token";

    public static void AddAuthorizationPolicies(this IServiceCollection services)
        => services.AddAuthorizationBuilder()
            .AddPolicy(Yes_Token, policy => policy.Requirements.Add(
                    new AuthorizationRequirement(RequireState.Required)))
            .AddPolicy(No_Token, policy => policy.Requirements.Add(
                    new AuthorizationRequirement(RequireState.NotAllowed)))
            .AddPolicy(IDC_Token, policy => policy.Requirements.Add(
                    new AuthorizationRequirement(RequireState.Disregarded)));
}
