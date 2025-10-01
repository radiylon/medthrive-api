import { Patient } from "../../../types.ts";
import { CreatePatientInput } from "../../../schemas.ts";
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

  async createPatient(patient: CreatePatientInput): Promise<string> {
    const newPatient: Patient = {
      ...patient,
      gender: patient.gender || "",
      id: uuidv4(),
      created_at: new Date(),
      updated_at: new Date()
    };

    mockPatients.push(newPatient);
    
    return 'Patient created successfully';
  }
}
