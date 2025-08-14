import { Medication } from "../../../types.ts";
import { medications as mockMedications } from "../../data/medications.ts"
import { v4 as uuidv4 } from 'uuid';

/**
 * Mock Medication Service
 * This is a mock implementation of the MedicationService class.
 * It is used to test the MedicationService class without relying on the actual database.
 */
export default class MockMedicationService {
  async getMedicationsByPatientId(patientId: string): Promise<Medication[]> {
    const medications = mockMedications.filter((medication) => medication.patient_id === patientId);
    return medications;
  }

  async getMedicationById(medicationId: string): Promise<Medication> {
    const medication = mockMedications.find((medication) => medication.id === medicationId);
    return medication!;
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

    mockMedications.push(newMedication);

    return newMedication;
  }

  async updateMedication(medication: Medication): Promise<string> {
    const updatedMedication = mockMedications.find((medication) => medication.id === medication.id);

    Object.assign(updatedMedication!, medication);

    return 'Medication updated successfully';
  }
}
