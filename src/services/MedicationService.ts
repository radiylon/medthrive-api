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

  async createMedication(patientId: string, medication: Medication): Promise<Medication> {
    const newMedication = {
      ...medication,
      patient_id: patientId,
      id: uuidv4()
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

    return medication;
  }
}
