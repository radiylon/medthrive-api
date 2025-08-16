import { Schedule } from "../types.ts";
import { Medication } from "../types.ts";
import { db } from '../drizzle.ts'
import { schedule as scheduleSchema } from "../db/schema/schedule.sql.ts";
import { eq, asc } from "drizzle-orm";

export default class ScheduleService {
  async getSchedulesByMedicationId(medicationId: string): Promise<Schedule[]> {
    const schedules = await db.select()
      .from(scheduleSchema)
      .where(eq(scheduleSchema.medication_id, medicationId))
      .orderBy(
        asc(scheduleSchema.scheduled_date),
        asc(scheduleSchema.taken_at)
      ).execute();
    return schedules;
  }

  async createSchedules(medicationData: Medication): Promise<string> {
    const { quantity, schedule, id: medicationId, patient_id: patientId } = medicationData;
    const { frequency, type, start_date } = schedule;

    const startDate = new Date(start_date);
    
    // Track how many pills we've scheduled
    let totalPillsScheduled = 0;
    
    // Track which day we're scheduling for
    let dayOffset = 0;

    // Continue until we've scheduled all pills
    while (totalPillsScheduled < quantity) {
      // Calculate the date for this set of pills
      const currentScheduleDate = new Date(startDate);
      
      // Add the day offset to get the current schedule date
      // For daily: adds 1 day each iteration
      // For weekly: adds 7 days each iteration
      currentScheduleDate.setDate(startDate.getDate() + dayOffset);

      // Schedule multiple pills for this date based on frequency
      // ex. if frequency is 2, create 2 schedules for the same date
      for (let pillsForThisDate = 0; pillsForThisDate < frequency && totalPillsScheduled < quantity; pillsForThisDate++) {
        
        // Create a schedule record for this pill
        await db.insert(scheduleSchema).values({
          medication_id: medicationId,
          patient_id: patientId,
          scheduled_date: currentScheduleDate,
          taken_at: null
        }).execute();

        // Increment our pill counter
        totalPillsScheduled++;
      }

      // Move to the next day/week based on schedule type
      if (type === 'daily') {
        dayOffset += 1;  // Move to next day
      } else {
        dayOffset += 7;  // Move to next week
      }
    }
    
    return 'Schedules created successfully';
  }

  async markScheduleAsTaken(scheduleId: string): Promise<string> {
    const schedule = await db.update(scheduleSchema).set({ 
      taken_at: new Date(),
      updated_at: new Date()
    }).where(eq(scheduleSchema.id, scheduleId)).execute();

    if (!schedule) {
      throw new Error('Error: Schedule not found');
    }

    return 'Schedule successfully marked as taken';
  }
}
