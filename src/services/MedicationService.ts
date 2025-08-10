import { Medication } from "../types";
import { medications as mockMedications } from "../__tests__/data/medications.ts"

export default class MedicationService {
  async getMedications(patientId: string): Promise<Medication[]> {
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
}
