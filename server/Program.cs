using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using ZeginHealthHub.Api;
using ZeginHealthHub.Api.Data;
using ZeginHealthHub.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Container hosts (Render, Railway, Fly, Cloud Run) pick the port and inject it as PORT.
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrWhiteSpace(port))
{
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
}

const string ClientCorsPolicy = "ClientCorsPolicy";

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});
builder.Services.AddOpenApi();

var database = DatabaseSettings.Resolve(builder.Configuration);
builder.Services.AddDbContext<ZeginDbContext>(options =>
{
    if (database.IsPostgres)
    {
        options.UseNpgsql(database.ConnectionString, npgsql => npgsql.EnableRetryOnFailure());
    }
    else
    {
        options.UseSqlite(database.ConnectionString);
    }
});

builder.Services.AddSingleton<SymptomCheckerService>();

var allowedOrigins = CorsSettings.Resolve(builder.Configuration);
builder.Services.AddCors(options =>
{
    options.AddPolicy(ClientCorsPolicy, policy =>
    {
        policy.SetIsOriginAllowed(origin => CorsSettings.IsAllowed(origin, allowedOrigins))
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Behind a host's TLS-terminating proxy, so that request scheme/host reflect the public URL.
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownIPNetworks.Clear();
    options.KnownProxies.Clear();
});

var app = builder.Build();

app.UseForwardedHeaders();

await InitializeDatabaseAsync(app);

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(ClientCorsPolicy);

app.UseAuthorization();

app.MapControllers();

// Liveness probe for the container host and for docker-compose's healthcheck.
app.MapGet("/health", () => Results.Ok(new
{
    status = "ok",
    database = database.ProviderName,
    utc = DateTime.UtcNow,
}));

app.Run();

async Task InitializeDatabaseAsync(WebApplication application)
{
    var logger = application.Services.GetRequiredService<ILoggerFactory>().CreateLogger("Startup");

    // A managed Postgres instance is often still accepting-connections-soon when the API
    // container starts, so the first few attempts are expected to fail.
    const int maxAttempts = 10;
    for (var attempt = 1; attempt <= maxAttempts; attempt++)
    {
        try
        {
            using var scope = application.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<ZeginDbContext>();
            await db.Database.EnsureCreatedAsync();
            SeedData.EnsureSeeded(db);
            logger.LogInformation("Database ready ({Provider}).", database.ProviderName);
            return;
        }
        catch (Exception ex) when (attempt < maxAttempts)
        {
            logger.LogWarning(ex, "Database not ready (attempt {Attempt}/{Max}); retrying.", attempt, maxAttempts);
            await Task.Delay(TimeSpan.FromSeconds(3));
        }
    }
}
