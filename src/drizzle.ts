import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { Resource } from "sst";
import { caregiver } from "./db/schema/caregiver.sql";
import { medication } from "./db/schema/medication.sql";
import { patient } from "./db/schema/patient.sql";
import { schedule } from "./db/schema/schedule.sql";

const pool = new Pool({
  host: Resource.MedthrivePostgres.host,
  port: Resource.MedthrivePostgres.port,
  user: Resource.MedthrivePostgres.username,
  password: Resource.MedthrivePostgres.password,
  database: Resource.MedthrivePostgres.database,
  ssl: {
    rejectUnauthorized: false
  }
});

const schema = { caregiver, medication, patient, schedule };

export const db = drizzle(pool, { schema });