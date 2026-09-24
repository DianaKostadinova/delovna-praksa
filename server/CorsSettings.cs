namespace ZeginHealthHub.Api;

/// <summary>
/// Which browser origins may call this API.
///
/// The frontend and the API are deployed to different hosts (Vercel and a container host), so
/// unlike local dev — where Vite proxies <c>/api</c> and the browser never sees a cross-origin
/// request — the deployed frontend really does make cross-origin calls and CORS has to name it.
/// Entries may be exact (<c>https://zegin.vercel.app</c>) or a single leading wildcard
/// (<c>https://*.vercel.app</c>) so that Vercel's per-commit preview URLs keep working.
/// </summary>
public static class CorsSettings
{
    private static readonly string[] LocalDefaults =
    [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173", // vite preview
        "http://localhost:8080", // the nginx container in docker-compose
    ];

    public static string[] Resolve(IConfiguration configuration)
    {
        var origins = new List<string>();

        // CORS_ALLOWED_ORIGINS is a comma-separated list — one flat env var is far easier to
        // paste into a host's dashboard than the indexed Cors__AllowedOrigins__0 form.
        origins.AddRange((configuration["CORS_ALLOWED_ORIGINS"] ?? string.Empty)
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries));

        origins.AddRange(configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? []);
        origins.AddRange(LocalDefaults);

        return origins
            .Select(o => o.TrimEnd('/'))
            .Where(o => o.Length > 0)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();
    }

    public static bool IsAllowed(string origin, IReadOnlyCollection<string> allowed)
    {
        origin = origin.TrimEnd('/');

        foreach (var entry in allowed)
        {
            if (entry.Contains('*'))
            {
                // Only "scheme://*.suffix" is supported — the wildcard must be a whole label,
                // so "https://*.vercel.app" matches "https://foo.vercel.app" but never
                // "https://evil-vercel.app" or "https://vercel.app.attacker.com".
                var suffix = entry[(entry.IndexOf('*') + 1)..];
                var scheme = entry[..entry.IndexOf("://", StringComparison.Ordinal)];
                if (suffix.StartsWith('.') &&
                    origin.StartsWith($"{scheme}://", StringComparison.OrdinalIgnoreCase) &&
                    origin.EndsWith(suffix, StringComparison.OrdinalIgnoreCase) &&
                    origin.Length > $"{scheme}://".Length + suffix.Length)
                {
                    return true;
                }
                continue;
            }

            if (string.Equals(entry, origin, StringComparison.OrdinalIgnoreCase))
                return true;
        }

        return false;
    }
}
