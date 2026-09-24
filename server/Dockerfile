# ---- build ----------------------------------------------------------------
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Restore before copying the rest of the source: the csproj changes far less often than the
# .cs files, so this layer stays cached across ordinary code edits.
COPY ZeginHealthHub.Api.csproj ./
RUN dotnet restore ZeginHealthHub.Api.csproj

COPY . .
RUN dotnet publish ZeginHealthHub.Api.csproj -c Release -o /app/publish /p:UseAppHost=false

# ---- runtime --------------------------------------------------------------
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

# curl is here for the container healthcheck and for the scheduled maintenance job.
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/publish ./

# When no DATABASE_URL is supplied the API falls back to SQLite; keep that file on a directory
# the non-root runtime user owns, so it can be mounted as a volume and actually be written to.
RUN mkdir -p /app/data && chown -R app:app /app/data
ENV ConnectionStrings__Default="Data Source=/app/data/zeginhealthhub.db"

ENV ASPNETCORE_ENVIRONMENT=Production \
    PORT=8080
EXPOSE 8080

USER app

HEALTHCHECK --interval=15s --timeout=3s --start-period=40s --retries=5 \
    CMD curl -fsS http://localhost:8080/health || exit 1

ENTRYPOINT ["dotnet", "ZeginHealthHub.Api.dll"]
