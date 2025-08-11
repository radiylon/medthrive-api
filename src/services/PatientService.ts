import { Patient } from "../types";
import { patients as mockPatients } from "../__tests__/data/patients.ts"
import { v4 as uuidv4 } from 'uuid';

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

  async createPatient(patient: Patient): Promise<Patient> {
    const newPatient = {
      ...patient,
      id: uuidv4()
    };

    mockPatients.push(newPatient);

    return newPatient;
  }
}