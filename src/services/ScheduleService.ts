import { Schedule } from "../types.ts";
import { Medication } from "../types.ts";
import { db } from '../drizzle.ts'
import { schedule as scheduleSchema } from "../db/schema/schedule.sql.ts";
import { eq, asc } from "drizzle-orm";

export default class ScheduleService {
  async getSchedulesByPatientId(patientId: string): Promise<Schedule[]> {
    const schedules = await db.select().from(scheduleSchema).where(eq(scheduleSchema.patient_id, patientId));
    return schedules;
  }

  async getSchedulesByMedicationId(medicationId: string): Promise<Schedule[]> {
    const schedules = await db.select()
      .from(scheduleSchema)
      .where(eq(scheduleSchema.medication_id, medicationId))
      .orderBy(asc(scheduleSchema.scheduled_date));
    return schedules;
  }
  
  async getScheduleById(scheduleId: string): Promise<Schedule> {
    const schedule = await db.select().from(scheduleSchema).where(eq(scheduleSchema.id, scheduleId));

    if (!schedule || schedule.length === 0) {
      throw new Error('Error: Schedule not found');
    }

    return schedule[0];
  }

  async createSchedules(medicationData: Medication): Promise<string> {
    const { quantity, schedule } = medicationData;
    const { frequency, type, start_date } = schedule;
    const startDate = new Date(start_date);
    
    for (let i = 0; i < quantity; i++) {
      const scheduledDate = new Date(startDate);
      
      if (type === 'daily') {
        scheduledDate.setDate(startDate.getDate() + i * frequency);
      } else if (type === 'weekly') {
        scheduledDate.setDate(startDate.getDate() + i * frequency * 7);
      }

      await db.insert(scheduleSchema).values({
        medication_id: medicationData.id,
        patient_id: medicationData.patient_id,
        scheduled_date: scheduledDate,
        taken_at: null
      });
    }
    
    return 'Schedules created successfully';
  }

  async markScheduleAsTaken(scheduleId: string): Promise<string> {
    const schedule = await db.update(scheduleSchema).set({ 
      taken_at: new Date(),
      updated_at: new Date()
    }).where(eq(scheduleSchema.id, scheduleId));

    if (!schedule) {
      throw new Error('Error: Schedule not found');
    }

    return 'Schedule successfully marked as taken';
  }
}
