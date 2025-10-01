import { Medication } from "../types.ts";
import { CreateMedicationInput, PatchMedicationInput } from "../schemas.ts";
import { db } from "../drizzle.ts";
import { medication as medicationSchema } from "../db/schema/medication.sql.ts";
import { eq } from "drizzle-orm";

export default class MedicationService {
  async getMedicationsByPatientId(patientId: string): Promise<Medication[]> {
    const medications = await db.select().from(medicationSchema).where(eq(medicationSchema.patient_id, patientId)).execute();
    return medications;
  }

  async getMedicationById(medicationId: string): Promise<Medication> {
    const medication = await db.select().from(medicationSchema).where(eq(medicationSchema.id, medicationId)).execute();
    return medication[0];
  }

  async createMedication(medication: CreateMedicationInput): Promise<Medication> {
    const newMedication = {
      patient_id: medication.patient_id,
      name: medication.name,
      description: medication.description || "",
      quantity: medication.quantity,
      is_active: medication.is_active,
      schedule: medication.schedule,
    };

    const [result] = await db.insert(medicationSchema)
      .values(newMedication)
      .returning()
      .execute();

    return result;
  }

  async updateMedication(medicationData: PatchMedicationInput): Promise<string> {
    await db.update(medicationSchema).set(medicationData).where(eq(medicationSchema.id, medicationData.id)).execute();

    return 'Medication updated successfully';
  }
}
