import { Patient } from "../types";
import { v4 as uuidv4 } from 'uuid';
import { db } from '../drizzle';
import { patient as patientSchema } from '../db/schema/patient.sql';
import { patients as mockPatients } from '../__tests__/data/patients.ts';

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

    await db.insert(patientSchema).values({
      ...newPatient,
      date_of_birth: newPatient.date_of_birth.toISOString()
    });
    
    return 'Patient created successfully';
  }
}