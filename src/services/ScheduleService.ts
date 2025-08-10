import { MedicationDose } from "../types";

export default class ScheduleService {
  async getMedicationDosesByPatientId(patientId: string): Promise<MedicationDose[]> {
    return [];
  }

  async getMedicationDoseByMedicationId(medicationId: string): Promise<MedicationDose> {
    return {} as MedicationDose;
  }
  
  async getMedicationDoseById(medicationDoseId: string): Promise<MedicationDose> {
    return {} as MedicationDose;
  }
}
