import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import { medication } from './medication.sql';
import { patient } from './patient.sql';

export const schedule = pgTable("schedule", {
  id: uuid("id").primaryKey().defaultRandom(),
  medication_id: uuid("medication_id")
    .notNull()
    .references(() => medication.id),
  patient_id: uuid("patient_id")
    .notNull()
    .references(() => patient.id),
  scheduled_date: timestamp("scheduled_date").notNull(),
  taken_at: timestamp("taken_at"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
