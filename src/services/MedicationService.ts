import { Medication } from "../types";
import { medications as mockMedications } from "../__tests__/data/medications.ts"
import { v4 as uuidv4 } from 'uuid';

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

  async createMedication(patientId: string, medicationData: Partial<Medication>): Promise<Medication> {
    const newMedication: Medication = {
      id: uuidv4(),
      patient_id: patientId,
      name: medicationData.name!,
      description: medicationData.description || "",
      quantity: medicationData.quantity!,
      is_active: medicationData.is_active ?? true,
      schedule: medicationData.schedule!,
      created_at: new Date(),
      updated_at: new Date()
    };

    mockMedications.push(newMedication);

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