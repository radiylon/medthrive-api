export interface Medication { 
  id: string;
  patient_id: string;
  name: string;
  quantity: number;
  is_active: boolean;
  schedule: {
    frequency: number;
    type: "daily" | "weekly";
    start_date: Date;
  }
  created_at: Date;
  updated_at: Date;
}

interface MedicationDose {
  id: string;
  patient_id: string;
  medication_id: string;
  scheduled_date: Date;
  taken_at: Date;
}

interface Caregiver {
  id: string;
  first_name: string;
  last_name: string;
}

interface Patient {
  id: string;
  caregiver_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: Date;
  created_at: Date;
  updated_at: Date;
}