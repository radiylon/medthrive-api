// @ts-nocheck
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { Resource } from "sst";
import { caregiver } from "./db/schema/caregiver.sql.ts";
import { medication } from "./db/schema/medication.sql.ts";
import { patient } from "./db/schema/patient.sql.ts";
import { schedule } from "./db/schema/schedule.sql.ts";

const pool = new Pool({
  host: Resource.MedthriveDatabase.host,
  port: Resource.MedthriveDatabase.port,
  user: Resource.MedthriveDatabase.username,
  password: Resource.MedthriveDatabase.password,
  database: Resource.MedthriveDatabase.database,
  ssl: {
    rejectUnauthorized: false
  }
});

const schema = { caregiver, medication, patient, schedule };

export const db = drizzle(pool, { schema });