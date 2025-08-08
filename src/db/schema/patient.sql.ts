import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";

export const patient = pgTable("patient", {
  id: uuid("id").primaryKey().defaultRandom(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull(),
  phone_number: text("phone_number").notNull(),
  date_of_birth: timestamp("date_of_birth").notNull(),
  gender: text("gender").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
