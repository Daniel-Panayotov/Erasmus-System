using API.DTOs;
using API.Services;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace API.Utilities;

public class ConfigurationService
{
    public static void SetupConfiguration(WebApplicationBuilder builder) 
    {
        builder.Configuration
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true);

        builder.Services.Configure<AppSettingsConfig>(builder.Configuration);

        builder.Services.AddDbContext<UEMSContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

        builder.Services.AddCors(options => options.AddDefaultPolicy(policy => {
            var origins = builder.Configuration.GetSection("CORS:Origins").Get<string[]>();
            policy.WithOrigins(origins)
                .WithHeaders("Content-Type", "Authorization")
                .AllowAnyMethod()
                .AllowCredentials();
        }));
    }
    public static void SetupServices(WebApplicationBuilder builder) 
    {
        builder.Services.ConfigureHttpJsonOptions(options =>
        {
            options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
        });

        builder.Services.ConfigureHttpJsonOptions(options =>
        {
            options.SerializerOptions.Converters.Add(new DateOnlyJsonConverter());
        });

        builder.Services.AddHostedService<CleanupService>();

        builder.Services.AddSingleton<IConfigStore, ConfigStoreService>();
    }
}
