/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Origin of the ASP.NET API, with no trailing slash — e.g.
   * "https://zegin-health-hub-api.onrender.com".
   *
   * Leave it unset for local dev and for the docker-compose setup: both put the API behind the
   * same origin as the frontend (the Vite proxy / the nginx `/api` location), so a relative
   * request already reaches it.
   */
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
