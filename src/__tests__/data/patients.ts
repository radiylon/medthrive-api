import { Patient } from "../../types";

export const patients: Patient[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174111",
    caregiver_id: "987f6543-e21b-12d3-a456-426614174000",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone_number: "+1-555-123-4567",
    date_of_birth: new Date("1980-05-15"),
    gender: "male",
    created_at: new Date("2024-03-01T08:00:00Z"),
    updated_at: new Date("2024-03-01T08:00:00Z")
  },
  {
    id: "223e4567-e89b-12d3-a456-426614174222",
    caregiver_id: "987f6543-e21b-12d3-a456-426614174000",
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    phone_number: "+1-555-234-5678",
    date_of_birth: new Date("1975-08-22"),
    gender: "female",
    created_at: new Date("2024-03-01T08:00:00Z"),
    updated_at: new Date("2024-03-01T08:00:00Z")
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174333",
    caregiver_id: "987f6543-e21b-12d3-a456-426614174001",
    first_name: "Robert",
    last_name: "Johnson",
    email: "robert.johnson@example.com",
    phone_number: "+1-555-345-6789",
    date_of_birth: new Date("1990-12-03"),
    gender: "male",
    created_at: new Date("2024-03-01T08:00:00Z"),
    updated_at: new Date("2024-03-01T08:00:00Z")
  },
  {
    id: "423e4567-e89b-12d3-a456-426614174444",
    caregiver_id: "987f6543-e21b-12d3-a456-426614174002",
    first_name: "Maria",
    last_name: "Garcia",
    email: "maria.garcia@example.com",
    phone_number: "+1-555-456-7890",
    date_of_birth: new Date("1988-03-25"),
    gender: "female",
    created_at: new Date("2024-03-01T08:00:00Z"),
    updated_at: new Date("2024-03-01T08:00:00Z")
  },
  {
    id: "523e4567-e89b-12d3-a456-426614174555",
    caregiver_id: "987f6543-e21b-12d3-a456-426614174002",
    first_name: "David",
    last_name: "Chen",
    email: "david.chen@example.com",
    phone_number: "+1-555-567-8901",
    date_of_birth: new Date("1995-11-08"),
    gender: "male",
    created_at: new Date("2024-03-01T08:00:00Z"),
    updated_at: new Date("2024-03-01T08:00:00Z")
  },
  {
    id: "623e4567-e89b-12d3-a456-426614174666",
    caregiver_id: "987f6543-e21b-12d3-a456-426614174002",
    first_name: "Sarah",
    last_name: "Williams",
    email: "sarah.williams@example.com",
    phone_number: "+1-555-678-9012",
    date_of_birth: new Date("1992-07-14"),
    gender: "other",
    created_at: new Date("2024-03-01T08:00:00Z"),
    updated_at: new Date("2024-03-01T08:00:00Z")
  }
];