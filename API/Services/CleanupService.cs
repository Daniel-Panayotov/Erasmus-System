using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class CleanupService : BackgroundService
{
    private readonly IServiceProvider _services;

    public CleanupService(IServiceProvider services)
    {
        _services = services;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await CleanExpiredRefreshTokens();

            await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
        }
    }

    private async Task CleanExpiredRefreshTokens()
    {
        using var scope = _services.CreateScope();
        var ctx = scope.ServiceProvider.GetRequiredService<UEMSContext>();

        await ctx.HashedRefreshTokens.Where(t => DateTime.Now.CompareTo(t.ExpiresAt) >= 0).ExecuteDeleteAsync();

        await ctx.DisposeAsync();
    }
}
