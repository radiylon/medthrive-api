import { Schedule } from "../types.ts";
import { v4 as uuidv4 } from 'uuid';
import { schedules as mockSchedules } from "../__tests__/data/schedules.ts";
import { Medication } from "../types.ts";
import { db } from '../drizzle.ts'
import { schedule as scheduleSchema } from "../db/schema/schedule.sql.ts";
import { eq } from "drizzle-orm";

export default class ScheduleService {
  async getSchedulesByPatientId(patientId: string): Promise<Schedule[]> {
    const schedules = await db.select().from(scheduleSchema).where(eq(scheduleSchema.patient_id, patientId));
    return schedules;
  }

  async getSchedulesByMedicationId(medicationId: string): Promise<Schedule[]> {
    const schedules = await db.select().from(scheduleSchema).where(eq(scheduleSchema.medication_id, medicationId));

    if (!schedules) {
      throw new Error('Error: Schedule not found');
    }

    return schedules;
  }
  
  async getScheduleById(scheduleId: string): Promise<Schedule> {
    const schedule = await db.select().from(scheduleSchema).where(eq(scheduleSchema.id, scheduleId));

    if (!schedule || schedule.length === 0) {
      throw new Error('Error: Schedule not found');
    }

    return schedule[0];
  }

  async createSchedules(medication: Medication): Promise<void> {
    const { quantity, schedule } = medication;
    const { frequency, type, start_date } = schedule;
    const startDate = new Date(start_date);
    
    for (let i = 0; i < quantity; i++) {
      const scheduledDate = new Date(startDate);
      
      if (type === 'daily') {
        scheduledDate.setDate(startDate.getDate() + i * frequency);
      } else if (type === 'weekly') {
        scheduledDate.setDate(startDate.getDate() + i * frequency * 7);
      }

      const newSchedule: Schedule = {
        id: uuidv4(),
        medication_id: medication.id,
        patient_id: medication.patient_id,
        scheduled_date: scheduledDate,
        taken_at: null,
        created_at: new Date(),
        updated_at: new Date()
      };

      await db.insert(scheduleSchema).values(newSchedule);
    }
  }

  async markScheduleAsTaken(scheduleId: string): Promise<Schedule> {
    const schedule = mockSchedules.find((schedule) => schedule.id === scheduleId);

    if (!schedule) {
      throw new Error('Error: Schedule not found');
    }

    schedule.taken_at = new Date();
    schedule.updated_at = new Date();

    return schedule;
  }
}
