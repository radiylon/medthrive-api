import { Medication } from "../types.ts";
import { v4 as uuidv4 } from 'uuid';
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

  async createMedication(medication: Medication): Promise<string> {
    const newMedication: Medication = {
      id: uuidv4(),
      patient_id: medication.patient_id!,
      name: medication.name!,
      description: medication.description || "",
      quantity: medication.quantity!,
      is_active: medication.is_active ?? true,
      schedule: medication.schedule!,
      created_at: new Date(),
      updated_at: new Date()
    };

    await db.insert(medicationSchema).values(newMedication);

    return 'Medication created successfully';
  }

  async updateMedication(medicationData: { id: string } & Partial<Omit<Medication, 'id'>>): Promise<string> {
    await db.update(medicationSchema).set(medicationData).where(eq(medicationSchema.id, medicationData.id!));

    return 'Medication updated successfully';
  }
}