import { Medication } from "../types.ts";
import { CreateMedicationInput, PatchMedicationInput } from "../schemas.ts";
import { db } from "../drizzle.ts";
import { medication as medicationSchema } from "../db/schema/medication.sql.ts";
import { eq } from "drizzle-orm";

export default class MedicationService {
  async getMedicationsByPatientId(patientId: string): Promise<Medication[]> {
    const medications = await db.select().from(medicationSchema).where(eq(medicationSchema.patient_id, patientId));
    return medications;
  }

  async getMedicationById(medicationId: string): Promise<Medication> {
    const medication = await db.select().from(medicationSchema).where(eq(medicationSchema.id, medicationId));

    if (!medication || medication.length === 0) {
      throw new Error('Error: Medication not found');
    }

    return medication[0];
  }

  async createMedication(medication: CreateMedicationInput): Promise<Medication> {
    const [result] = await db.insert(medicationSchema)
      .values(medication)
      .returning();

    return result;
  }

  async updateMedication(medicationData: PatchMedicationInput): Promise<string> {
    await db.update(medicationSchema).set(medicationData).where(eq(medicationSchema.id, medicationData.id));

    return 'Medication updated successfully';
  }
}
