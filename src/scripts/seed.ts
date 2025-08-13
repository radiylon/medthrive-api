import { db } from "../drizzle.ts";
import { patient as patientSchema } from "../db/schema/patient.sql.ts";
import { caregiver as caregiverSchema } from "../db/schema/caregiver.sql.ts";

export default async function seed() {
  // Create initial caregiver
  const caregiverData = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone_number: '9876543210',
    date_of_birth: '1985-01-01',
    gender: 'male'
  };

  const [caregiverResult] = await db.insert(caregiverSchema)
    .values(caregiverData)
    .returning({ id: caregiverSchema.id });

  console.log('Caregiver created:', caregiverResult.id);

  // Create initial patient with the caregiver's ID
  const patientData = {
    first_name: 'Ray',
    last_name: 'Mendez',
    email: 'ray.mendez@example.com',
    phone_number: '1234567890',
    date_of_birth: '1990-01-01',
    gender: 'male',
    caregiver_id: caregiverResult.id
  };

  const [patientResult] = await db.insert(patientSchema).values(patientData).returning({ id: patientSchema.id });
  
  console.log('Patient created:', patientResult.id);
}

await seed();