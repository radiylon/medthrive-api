import { Medication } from "../types";
import { medications as mockMedications } from "../__tests__/data/medications.ts"
import { v4 as uuidv4 } from 'uuid';
import { db } from "../drizzle.ts";
import { medication as medicationSchema } from "../db/schema/medication.sql.ts";

export default class MedicationService {
  async getMedicationsByPatientId(patientId: string): Promise<Medication[]> {
    const medications = mockMedications.filter((medication) => medication.patient_id === patientId);
    return medications;
  }

  async getMedicationById(medicationId: string): Promise<Medication> {
    const medication = mockMedications.find((medication) => medication.id === medicationId);

    if (!medication) {
      throw new Error('Error: Medication not found');
    }

    return medication;
  }

  async createMedication(medication: Medication): Promise<Medication> {
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

    return newMedication;
  }

  async updateMedication(medication: Medication): Promise<Medication> {
    const updatedMedication = mockMedications.find((medication) => medication.id === medication.id);

    if (!updatedMedication) {
      throw new Error('Error: Medication not found');
    }

    Object.assign(updatedMedication, medication);

    return updatedMedication;
  }
}