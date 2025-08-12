import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { Resource } from "sst";
import { caregiver } from "./db/schema/caregiver.sql";
import { medication } from "./db/schema/medication.sql";
import { patient } from "./db/schema/patient.sql";
import { schedule } from "./db/schema/schedule.sql";

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