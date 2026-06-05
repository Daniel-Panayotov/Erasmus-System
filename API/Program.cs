using API.Endpoints;
using API.Utilities;

var builder = WebApplication.CreateBuilder(args);

ConfigurationService.SetupConfiguration(builder);
ConfigurationService.SetupServices(builder);

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseCors();

app.RegisterEndpoints();

app.Run();

