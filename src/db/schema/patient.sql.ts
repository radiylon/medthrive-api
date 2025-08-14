import { pgTable, uuid, timestamp, text, date, jsonb } from "drizzle-orm/pg-core";

export const patient = pgTable("patient", {
  id: uuid("id").primaryKey().defaultRandom(),
  caregiver_id: uuid("caregiver_id").notNull(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull(),
  phone_number: text("phone_number").notNull(),
  date_of_birth: date("date_of_birth").notNull(),
  gender: text("gender").notNull(),
  address: jsonb("address").notNull().$type<{
    street: string;
    city: string;
    state: string;
    zipcode: string;
  }>(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
