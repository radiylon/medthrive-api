import { Medication } from "../../types";

export const medications: Medication[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    patient_id: "123e4567-e89b-12d3-a456-426614174111",
    name: "Lisinopril",
    quantity: 30,
    is_active: true,
    schedule: {
      frequency: 1,
      type: "daily",
      start_date: new Date("2024-03-01")
    },
    created_at: new Date("2024-03-01T08:00:00Z"),
    updated_at: new Date("2024-03-01T08:00:00Z")
  },
  {
    id: "223e4567-e89b-12d3-a456-426614174001",
    patient_id: "123e4567-e89b-12d3-a456-426614174111",
    name: "Metformin",
    quantity: 60,
    is_active: true,
    schedule: {
      frequency: 2,
      type: "daily",
      start_date: new Date("2024-03-01")
    },
    created_at: new Date("2024-03-01T08:00:00Z"),
    updated_at: new Date("2024-03-01T08:00:00Z")
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174002",
    patient_id: "223e4567-e89b-12d3-a456-426614174222",
    name: "Amoxicillin",
    quantity: 21,
    is_active: true,
    schedule: {
      frequency: 3,
      type: "daily",
      start_date: new Date("2024-03-01")
    },
    created_at: new Date("2024-03-01T08:00:00Z"),
    updated_at: new Date("2024-03-01T08:00:00Z")
  },
  {
    id: "423e4567-e89b-12d3-a456-426614174003",
    patient_id: "223e4567-e89b-12d3-a456-426614174222",
    name: "Ibuprofen",
    quantity: 30,
    is_active: true,
    schedule: {
      frequency: 4,
      type: "daily",
      start_date: new Date("2024-03-01")
    },
    created_at: new Date("2024-03-01T08:00:00Z"),
    updated_at: new Date("2024-03-01T08:00:00Z")
  },
  {
    id: "523e4567-e89b-12d3-a456-426614174004",
    patient_id: "323e4567-e89b-12d3-a456-426614174333",
    name: "Omeprazole",
    quantity: 30,
    is_active: true,
    schedule: {
      frequency: 1,
      type: "daily",
      start_date: new Date("2024-03-01")
    },
    created_at: new Date("2024-03-01T08:00:00Z"),
    updated_at: new Date("2024-03-01T08:00:00Z")
  }
];