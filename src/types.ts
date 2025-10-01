export interface Medication { 
  id: string;
  patient_id: string;
  name: string;
  description?: string | null;
  quantity: number;
  is_active: boolean;
  schedule: {
    frequency: number;
    type: "daily" | "weekly";
    start_date: Date;
  };
  created_at: Date;
  updated_at: Date;
}

export interface Schedule {
  id: string;
  patient_id: string;
  medication_id: string;
  scheduled_date: Date;
  taken_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface Patient {
  id: string;
  caregiver_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  created_at: Date;
  updated_at: Date;
}
