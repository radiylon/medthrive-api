import { Schedule } from "../types";
import { v4 as uuidv4 } from 'uuid';
import { schedules as mockSchedules } from "../__tests__/data/schedules.ts";
import { Medication } from "../types";

export default class ScheduleService {
  async getSchedulesByPatientId(patientId: string): Promise<Schedule[]> {
    return mockSchedules.filter((schedule) => schedule.patient_id === patientId);
  }

  async getScheduleByMedicationId(medicationId: string): Promise<Schedule> {
    const schedule = mockSchedules.find((schedule) => schedule.medication_id === medicationId);

    if (!schedule) {
      throw new Error('Error: Schedule not found');
    }

    return schedule;
  }
  
  async getScheduleById(scheduleId: string): Promise<Schedule> {
    const schedule = mockSchedules.find((schedule) => schedule.id === scheduleId);

    if (!schedule) {
      throw new Error('Error: Schedule not found');
    }

    return schedule;
  }

  async createSchedules(medication: Medication): Promise<void> {
    const { quantity, schedule } = medication;
    const { frequency, type, start_date } = schedule;
    
    for (let i = 0; i < quantity; i++) {
      let scheduledDate;
      if (type === 'daily') {
        scheduledDate = new Date(start_date.getTime() + i * frequency * 24 * 60 * 60 * 1000);
      } else if (type === 'weekly') {
        scheduledDate = new Date(start_date.getTime() + i * frequency * 7 * 24 * 60 * 60 * 1000);
      }

      const schedule = {
        id: uuidv4(),
        medication_id: medication.id,
        patient_id: medication.patient_id,
        scheduled_date: scheduledDate,
        taken_at: null,
        created_at: new Date(),
        updated_at: new Date()
      };

      mockSchedules.push(schedule as Schedule);
    }
  }

  async markScheduleAsTaken(scheduleId: string): Promise<Schedule> {
    const schedule = mockSchedules.find((schedule) => schedule.id === scheduleId);

    if (!schedule) {
      throw new Error('Error: Schedule not found');
    }

    schedule.taken_at = new Date();

    return schedule;
  }
}
