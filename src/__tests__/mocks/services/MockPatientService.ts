import { Patient } from "../../../types.ts";
import { v4 as uuidv4 } from 'uuid';
import { patients as mockPatients } from '../../data/patients.ts';

/**
 * Mock Patient Service
 * This is a mock implementation of the PatientService class.
 * It is used to test the PatientService class without relying on the actual database.
 */
export default class MockPatientService {
  async getPatients(): Promise<Patient[]> {
    return mockPatients;
  }

  async getPatientById(patientId: string): Promise<Patient> {
    const patient = mockPatients.find((patient) => patient.id === patientId);

    if (!patient) {
      throw new Error('Error: Patient not found');
    }

    return patient;
  }

  async createPatient(patient: Patient): Promise<string> {
    const newPatient = {
      ...patient,
      id: uuidv4()
    };

    mockPatients.push(newPatient);
    
    return 'Patient created successfully';
  }
}