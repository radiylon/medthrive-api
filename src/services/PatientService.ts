import { Patient } from "../types.ts";
import { v4 as uuidv4 } from 'uuid';
import { db } from '../drizzle.ts';
import { patient as patientSchema } from '../db/schema/patient.sql.ts';
import { patients as mockPatients } from '../__tests__/data/patients.ts';
import { eq } from "drizzle-orm";

export default class PatientService {
  async getPatientsByCaregiverId(caregiverId: string): Promise<Patient[]> {
    const patients = await db.select().from(patientSchema).where(eq(patientSchema.caregiver_id, caregiverId));
    return patients;
  }

  async getPatientById(patientId: string): Promise<Patient> {
    const patient = await db.select().from(patientSchema).where(eq(patientSchema.id, patientId));

    if (!patient || patient.length === 0) {
      throw new Error('Error: Patient not found');
    }

    return patient[0];
  }

  async createPatient(patient: Patient): Promise<string> {
    const newPatient = {
      ...patient,
      caregiver_id: '123e4567-e89b-12d3-a456-426614174000', // Hardcoded for now to represent a single Caregiver user
      id: uuidv4()
    };

    await db.insert(patientSchema).values(newPatient);
    
    return 'Patient created successfully';
  }
}