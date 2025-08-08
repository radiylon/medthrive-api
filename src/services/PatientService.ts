import { Patient } from "../types";
import { patients } from "../__tests__/data/patients.ts"

export default class PatientService {
  /**
   * Fetches all patients
   * @returns A promise that resolves to a Patient object.
   * @throws Error if the API call fails or the response is not valid.
   */
  async getPatients(): Promise<Patient[]> {
    try {
      return patients;
    } catch(err) {
      throw new Error('Failed to fetch patients');
    }
  }
  
  /**
   * Fetches a single patient by ID
   * @param patientId The ID of the patient to fetch
   * @returns A promise that resolves to a Patient object.
   * @throws Error if the patient is not found or if there's an error.
   */
  async getPatientById(patientId: string): Promise<Patient> {
    try {
      const patient = patients.find((patient) => patient.id === patientId);

      if (!patient) {
        throw new Error('Patient not found');
      }

      return patient;
    } catch(err) {
      throw new Error('Failed to fetch patient');
    }
  }
}