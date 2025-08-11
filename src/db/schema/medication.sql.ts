import { text, uuid, pgTable, boolean, timestamp, jsonb, integer } from "drizzle-orm/pg-core";
import { patient } from './patient.sql';

export const medication = pgTable("medication", {
  id: uuid("id").primaryKey().defaultRandom(),
  patient_id: uuid("patient_id")
    .notNull()
    .references(() => patient.id),
  name: text("name").notNull(),
  description: text("description"),
  quantity: integer("quantity").notNull(),
  is_active: boolean("is_active").notNull().default(true),
  schedule: jsonb("schedule").notNull().$type<{
    frequency: number;
    type: "daily" | "weekly";
    start_date: Date,
  }>(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
