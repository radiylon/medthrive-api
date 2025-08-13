import { Caregiver } from "../types.ts";
import { db } from '../drizzle.ts';
import { caregiver as caregiverSchema } from '../db/schema/caregiver.sql.ts';
import { eq } from "drizzle-orm";

export default class CaregiverService {
  async getCaregiverById(caregiverId: string): Promise<Caregiver> {
    const caregiver = await db.select().from(caregiverSchema).where(eq(caregiverSchema.id, caregiverId));

    if (!caregiver || caregiver.length === 0) {
      throw new Error('Error: Caregiver not found');
    }
    
    return caregiver[0];
  }
}