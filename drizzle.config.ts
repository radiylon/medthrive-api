import { Resource } from "sst";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: ["./src/**/*.sql.ts"],
  out: "./src/db/migrations",
  dbCredentials: {
    host: Resource.MedDatabase.host,
    port: Resource.MedDatabase.port,
    user: Resource.MedDatabase.username,
    password: Resource.MedDatabase.password,
    database: Resource.MedDatabase.database,
    ssl: {
      rejectUnauthorized: false
    }
  },
});
