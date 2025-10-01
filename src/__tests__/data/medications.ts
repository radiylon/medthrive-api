import { Medication } from "../../types";

export const medications: Medication[] = [
  {
    id: "323e4567-e89b-12d3-a456-426614174000",
    patient_id: "223e4567-e89b-12d3-a456-426614174000",
    name: "Lisinopril",
    description: "Blood pressure medication",
    quantity: 30,
    is_active: true,
    schedule: {
      frequency: 1,
      type: "daily",
      start_date: new Date("2025-07-27T09:00:00Z")
    },
    created_at: new Date("2025-07-27T09:00:00Z"),
    updated_at: new Date("2025-07-27T09:00:00Z")
  }
];
