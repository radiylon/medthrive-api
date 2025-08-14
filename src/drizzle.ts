// @ts-nocheck
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { Resource } from "sst";
import { medication } from "./db/schema/medication.sql.ts";
import { patient } from "./db/schema/patient.sql.ts";
import { schedule } from "./db/schema/schedule.sql.ts";

const pool = new Pool({
  host: Resource.MedDatabase.host,
  port: Resource.MedDatabase.port,
  user: Resource.MedDatabase.username,
  password: Resource.MedDatabase.password,
  database: Resource.MedDatabase.database,
  ssl: {
    rejectUnauthorized: false
  }
});

const schema = { medication, patient, schedule };

export const db = drizzle(pool, { schema });