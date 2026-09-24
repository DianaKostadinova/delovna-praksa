using Npgsql;

namespace ZeginHealthHub.Api.Data;

/// <summary>
/// Works out which database the API should talk to and hands back a connection string the
/// matching EF Core provider understands.
///
/// Locally (and in the default docker-compose profile) this is SQLite: one file, nothing to
/// install. In a real deployment the container filesystem is usually ephemeral — a redeploy
/// would silently throw away every contact message and analytics row — so hosts hand us a
/// managed PostgreSQL instance instead, normally as a <c>postgres://</c> URL. Npgsql does not
/// accept URLs, so we translate one into a key/value connection string here.
/// </summary>
public sealed record DatabaseSettings(bool IsPostgres, string ConnectionString)
{
    private const string SqliteFallback = "Data Source=zeginhealthhub.db";

    public string ProviderName => IsPostgres ? "PostgreSQL" : "SQLite";

    public static DatabaseSettings Resolve(IConfiguration configuration)
    {
        // DATABASE_URL is what Render, Railway, Fly and Heroku all inject; the
        // ConnectionStrings:Default form is what appsettings.json and local dev use.
        var raw = FirstNonEmpty(
            configuration["DATABASE_URL"],
            configuration.GetConnectionString("Default"),
            SqliteFallback);

        if (LooksLikePostgresUrl(raw))
            return new DatabaseSettings(true, ConvertPostgresUrl(raw));

        // An already-expanded Npgsql connection string (Host=...;Database=...) is passed through.
        if (raw.Contains("Host=", StringComparison.OrdinalIgnoreCase) &&
            raw.Contains("Database=", StringComparison.OrdinalIgnoreCase))
            return new DatabaseSettings(true, raw);

        return new DatabaseSettings(false, raw);
    }

    private static bool LooksLikePostgresUrl(string value) =>
        value.StartsWith("postgres://", StringComparison.OrdinalIgnoreCase) ||
        value.StartsWith("postgresql://", StringComparison.OrdinalIgnoreCase);

    private static string ConvertPostgresUrl(string url)
    {
        var uri = new Uri(url);
        var userInfo = uri.UserInfo.Split(':', 2);

        var b = new NpgsqlConnectionStringBuilder
        {
            Host = uri.Host,
            Port = uri.IsDefaultPort ? 5432 : uri.Port,
            Database = uri.AbsolutePath.TrimStart('/'),
            Username = Uri.UnescapeDataString(userInfo[0]),
            Password = userInfo.Length > 1 ? Uri.UnescapeDataString(userInfo[1]) : null,
        };

        // Managed providers terminate TLS at a proxy with a certificate that won't chain to a
        // root the container trusts, so verification is relaxed unless the URL says otherwise.
        b.SslMode = ReadQueryValue(uri.Query, "sslmode") switch
        {
            "disable" => SslMode.Disable,
            "allow" => SslMode.Allow,
            "prefer" => SslMode.Prefer,
            "verify-ca" => SslMode.VerifyCA,
            "verify-full" => SslMode.VerifyFull,
            _ => SslMode.Require,
        };

        return b.ConnectionString;
    }

    private static string? ReadQueryValue(string query, string key)
    {
        foreach (var pair in query.TrimStart('?').Split('&', StringSplitOptions.RemoveEmptyEntries))
        {
            var parts = pair.Split('=', 2);
            if (parts.Length == 2 && string.Equals(parts[0], key, StringComparison.OrdinalIgnoreCase))
                return Uri.UnescapeDataString(parts[1]).ToLowerInvariant();
        }
        return null;
    }

    private static string FirstNonEmpty(params string?[] candidates) =>
        candidates.FirstOrDefault(c => !string.IsNullOrWhiteSpace(c)) ?? SqliteFallback;
}
