import { Medication } from "../../../types.ts";
import { CreateMedicationInput, PatchMedicationInput } from "../../../schemas.ts";
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

  async createMedication(medication: CreateMedicationInput): Promise<Medication> {
    const newMedication: Medication = {
      id: uuidv4(),
      patient_id: medication.patient_id,
      name: medication.name,
      description: medication.description || "",
      quantity: medication.quantity,
      is_active: medication.is_active,
      schedule: medication.schedule,
      created_at: new Date(),
      updated_at: new Date()
    };

    mockMedications.push(newMedication);

    return newMedication;
  }

  async updateMedication(medication: PatchMedicationInput): Promise<string> {
    // Remove the old medication
    const index = mockMedications.findIndex((m) => m.id === medication.id);
    if (index === -1) {
      throw new Error('Medication not found');
    }
    
    // Create updated medication
    const updatedMedication = {
      ...mockMedications[index],
      ...medication,
      updated_at: new Date()
    };

    // Replace in array
    mockMedications.splice(index, 1, updatedMedication);

    return 'Medication updated successfully';
  }
}
