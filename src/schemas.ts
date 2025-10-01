import * as z from 'zod';

export type CreateMedicationInput = z.infer<typeof createMedicationSchema>;
export type CreatePatientInput = z.infer<typeof createPatientSchema>;
export type PatchMedicationInput = z.infer<typeof patchMedicationSchema>;

export const getMedicationByIdSchema = z.object({
  medication_id: z.string({
    required_error: "Error: medication_id is required"
  }).min(1, "Error: medication_id is required")
}, {
  invalid_type_error: "Error: medication_id is required"
});

export const getMedicationsByPatientIdSchema = z.object({
  patient_id: z.string({
    required_error: "Error: patient_id is required",
    invalid_type_error: "Error: patient_id is required"
  }).min(1, "Error: patient_id is required")
});

export const getPatientByIdSchema = z.object({
  patient_id: z.string({
    required_error: "Error: patient_id is required"
  }).min(1, "Error: patient_id is required")
}, {
  invalid_type_error: "Error: patient_id is required",
  required_error: "Error: patient_id is required"
});

export const getSchedulesByMedicationIdSchema = z.object({
  medication_id: z.string({
    required_error: "Error: medication_id is required"
  }).min(1, "Error: medication_id is required")
});

export const markScheduleSchema = z.object({
  schedule_id: z.string({
    required_error: "Error: schedule_id is required"
  }).min(1, "Error: schedule_id is required")
});

export const createMedicationSchema = z.object({
  patient_id: z.string({ required_error: "Error: Missing required fields" }),
  name: z.string({ required_error: "Error: Missing required fields" }),
  description: z.string().optional(),
  quantity: z.number({ required_error: "Error: Missing required fields" }),
  is_active: z.boolean({ required_error: "Error: Missing required fields" }),
  schedule: z.object({
    frequency: z.number(),
    type: z.enum(["daily", "weekly"]),
    start_date: z.coerce.date()
  }, { required_error: "Error: Missing required fields" })
});

export const createPatientSchema = z.object({
  caregiver_id: z.string({ required_error: "Error: Missing required fields" }),
  first_name: z.string({ required_error: "Error: Missing required fields" }),
  last_name: z.string({ required_error: "Error: Missing required fields" }),
  email: z.string({ required_error: "Error: Missing required fields" }),
  phone_number: z.string({ required_error: "Error: Missing required fields" }),
  date_of_birth: z.string({ required_error: "Error: Missing required fields" }),
  gender: z.string({ required_error: "Error: Missing required fields" }),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipcode: z.string()
  }, { required_error: "Error: Missing required fields" })
});

export const patchMedicationSchema = z.object({
  id: z.string({
    required_error: "Error: id is required",
    invalid_type_error: "Error: id is not a string"
  })
}).passthrough();
