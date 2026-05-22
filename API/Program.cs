using API;
using API.Endpoints;
using API.Utilities;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<UEMSContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

ConfigurationService.SetupConfiguration(builder);
ConfigurationService.SetupServices(builder);

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.RegisterEndpoints();

app.Run();

