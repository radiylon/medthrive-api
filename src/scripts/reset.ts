import { sql } from "drizzle-orm";
import { db } from "../drizzle";

async function reset() {
  try {
    await db.execute(sql`
      DROP TABLE IF EXISTS "schedule" CASCADE;
      DROP TABLE IF EXISTS "medication" CASCADE;
      DROP TABLE IF EXISTS "patient" CASCADE;
      DROP TABLE IF EXISTS "__drizzle_migrations" CASCADE;
    `);

    console.log("All tables dropped successfully");
    console.log("Database reset completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error resetting database:", error);
    process.exit(1);
  }
}

await reset();
