import { Resource } from "sst";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: ["./src/**/*.sql.ts"],
  out: "./src/db/migrations",
  dbCredentials: {
    host: Resource.MedthriveDatabase.host,
    port: Resource.MedthriveDatabase.port,
    user: Resource.MedthriveDatabase.username,
    password: Resource.MedthriveDatabase.password,
    database: Resource.MedthriveDatabase.database,
    ssl: {
      rejectUnauthorized: false
    }
  },
});
