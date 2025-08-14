import { Patient } from "../types.ts";
import { v4 as uuidv4 } from 'uuid';
import { db } from '../drizzle.ts';
import { patient as patientSchema } from '../db/schema/patient.sql.ts';
import { eq } from "drizzle-orm";

export default class PatientService {
  async getPatients(): Promise<{ id: string, first_name: string, last_name: string }[]> {
    const patients = await db.select({
      id: patientSchema.id,
      first_name: patientSchema.first_name,
      last_name: patientSchema.last_name,
    }).from(patientSchema);

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
      id: uuidv4()
    };

    await db.insert(patientSchema).values(newPatient);
    
    return 'Patient created successfully';
  }
}
