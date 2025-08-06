export interface Medication {
  id: string;
  patientId: string;
  name: string;
  dosage: string;
  frequency: string;
}

export const medications: Medication[] = [
  {
    id: "med-001",
    patientId: "patient-1",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily"
  },
  {
    id: "med-002",
    patientId: "patient-1",
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily"
  },
  {
    id: "med-003",
    patientId: "patient-2",
    name: "Amoxicillin",
    dosage: "250mg",
    frequency: "Every 8 hours"
  },
  {
    id: "med-004",
    patientId: "patient-2",
    name: "Ibuprofen",
    dosage: "400mg",
    frequency: "As needed"
  },
  {
    id: "med-005",
    patientId: "patient-3",
    name: "Omeprazole",
    dosage: "20mg",
    frequency: "Once daily"
  }
];