using API.Endpoints;
using API.Utilities;

var builder = WebApplication.CreateBuilder(args);

ConfigurationUtils.SetupConfiguration(builder);
ConfigurationUtils.SetupServices(builder);

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.RegisterEndpoints();

app.Run();

