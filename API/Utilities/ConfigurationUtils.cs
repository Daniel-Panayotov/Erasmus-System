using API.DTOs;
using API.Services;
using API.Services.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace API.Utilities;

public class ConfigurationUtils
{
    public static void SetupConfiguration(WebApplicationBuilder builder) 
    {
        builder.Configuration
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true);

        builder.Services.Configure<AppSettingsConfig>(builder.Configuration);

        builder.Services.AddDbContext<UEMSContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

        builder.Services.AddCors(options => options.AddDefaultPolicy(policy => {
            var origins = builder.Configuration.GetSection("Urls:Origins").Get<string[]>();
            policy.WithOrigins(origins)
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        }));
    }
    public static void SetupServices(WebApplicationBuilder builder) 
    {
        builder.Services.ConfigureHttpJsonOptions(options => {
            options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
        });

        builder.Services.ConfigureHttpJsonOptions(options => {
            options.SerializerOptions.Converters.Add(new DateOnlyJsonConverter());
        });

        builder.Services.AddSingleton<IConfigStore, ConfigStoreService>();
        // authentication
        builder.Services.AddHostedService<CleanupService>();
        builder.Services.AddAuthentication("JWTAuthentication").AddScheme<AuthenticationSchemeOptions, JWTAuthenticationHandler>("JWTAuthentication", null);
        // authorization
        builder.Services.AddSingleton<IAuthorizationHandler, GeneralAuthorizationHandler>();
        builder.Services.AddAuthorizationPolicies();
        builder.Services.AddAuthorization();
        // cryptography
        builder.Services.AddSingleton<ICryptographicService, CryptographicService>();

        builder.Services.AddSingleton<JWTService>();
    }
}
