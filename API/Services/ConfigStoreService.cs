using API.DTOs;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace API.Services;

public interface IConfigStore
{
    SecurityKey GetSecurityKey();
    public string ApplicationUrl { get; }
    JWTConfig JwtConfig { get; }
}

public sealed class ConfigStoreService : IConfigStore
{
    private AppSettingsConfig _appSettings;
    public JWTConfig JwtConfig => _appSettings.JWT;
    public string ApplicationUrl => _appSettings.Urls.ApplicationUrl;

    public ConfigStoreService(IOptionsMonitor<AppSettingsConfig> appsettingsMonitor)
    {
        _appSettings = appsettingsMonitor.CurrentValue;

        appsettingsMonitor.OnChange(LoadAppSettings);
    }

    private void LoadAppSettings(AppSettingsConfig appSettings)
    {
        _appSettings = appSettings;
    }

    public SecurityKey GetSecurityKey()
    {
        return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtConfig.Secret));
    }
}
