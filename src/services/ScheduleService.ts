import { Schedule } from "../types";

export default class ScheduleService {
  async getSchedulesByPatientId(patientId: string): Promise<Schedule[]> {
    return [];
  }

  async getScheduleByMedicationId(medicationId: string): Promise<Schedule> {
    return {} as Schedule;
  }
  
  async getScheduleById(scheduleId: string): Promise<Schedule> {
    return {} as Schedule;
  }
}
