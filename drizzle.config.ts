import { Resource } from "sst";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  // Pick up all our schema files
  schema: ["./src/**/*.sql.ts"],
  out: "./migrations",
  dbCredentials: {
    host: Resource.MedthrivePostgres.host,
    port: Resource.MedthrivePostgres.port,
    user: Resource.MedthrivePostgres.username,
    password: Resource.MedthrivePostgres.password,
    database: Resource.MedthrivePostgres.database,
  },
});