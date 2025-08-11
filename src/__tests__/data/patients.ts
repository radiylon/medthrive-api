import { Patient } from "../../types";

export const patients: Patient[] = [
  {
    id: "223e4567-e89b-12d3-a456-426614174000",
    caregiver_id: "123e4567-e89b-12d3-a456-426614174000",
    first_name: "Bob",
    last_name: "Wilson",
    email: "bob.wilson@example.com",
    phone_number: "+1-555-987-6543",
    date_of_birth: new Date("1945-08-20"),
    gender: "male",
    created_at: new Date("2024-03-01T08:00:00Z"),
    updated_at: new Date("2024-03-01T08:00:00Z")
  }
];