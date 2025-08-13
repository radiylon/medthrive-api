import { Patient } from "../../../types.ts";
import { v4 as uuidv4 } from 'uuid';
import { patients as mockPatients } from '../../data/patients.ts';

/**
 * Mock Patient Service
 * This is a mock implementation of the PatientService class.
 * It is used to test the PatientService class without relying on the actual database.
 */
export default class PatientService {
  async getPatientsByCaregiverId(caregiverId: string): Promise<Patient[]> {
    return mockPatients.filter((patient) => patient.caregiver_id === caregiverId);
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
      caregiver_id: '123e4567-e89b-12d3-a456-426614174000',
      id: uuidv4()
    };

    mockPatients.push(newPatient);
    
    return 'Patient created successfully';
  }
}