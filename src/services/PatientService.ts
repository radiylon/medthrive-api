import { Patient } from "../types";
import { patients as mockPatients } from "../__tests__/data/patients.ts"

export default class PatientService {
  async getPatients(caregiverId: string): Promise<Patient[]> {
    return mockPatients.filter((patient) => patient.caregiver_id === caregiverId);
  }

  async getPatientById(patientId: string): Promise<Patient> {
    const patient = mockPatients.find((patient) => patient.id === patientId);

    if (!patient) {
      throw new Error('Error: Patient not found');
    }

    return patient;
  }
}