import { Schedule } from "../types";
import { v4 as uuidv4 } from 'uuid';
import { schedules as mockSchedules } from "../__tests__/data/schedules.ts";

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

  async createSchedule(schedule: Schedule): Promise<Schedule> {
    const newSchedule = {
      ...schedule,
      id: uuidv4()
    };

    mockSchedules.push(newSchedule);

    return newSchedule;
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
