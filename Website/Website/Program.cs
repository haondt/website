using Website.Domain;
using Website.Models;
using Website.Styles;

var builder = WebApplication.CreateBuilder(args);

var CORS_POLICY = "_websitePolicy";

builder.Services.AddControllers();
builder.Services.AddMvc();

builder.Services.AddCors(o =>
{
    o.AddPolicy(name: CORS_POLICY, policy =>
    {
        policy.AllowAnyOrigin();
        policy.AllowAnyHeader();
    });
});

builder.Configuration.AddEnvironmentVariables();
builder.Services.Configure<SiteData>(builder.Configuration.GetSection(nameof(SiteData)));
builder.Services.AddSingleton<StylesProvider>();
builder.Services.AddSingleton<SiteService>();

var app = builder.Build();

app.UseStaticFiles();

app.UseCors(CORS_POLICY);
app.UseAuthorization();
app.MapControllers();

app.Run();
