import { db } from "../drizzle.ts";
import { patient as patientSchema } from "../db/schema/patient.sql.ts";
import { v4 as uuidv4 } from 'uuid';

export default async function seed() {
  const patientData = {
    first_name: 'Ray',
    last_name: 'Mendez',
    email: 'ray.mendez@example.com',
    phone_number: '1234567890',
    date_of_birth: '1990-01-01',
    gender: 'male',
    address: {
      street: '123 Main St',
      city: 'San Diego',
      state: 'CA',
      zipcode: '92122'
    },
    caregiver_id: uuidv4()
  };

  const [patientResult] = await db.insert(patientSchema).values(patientData).returning({ id: patientSchema.id });
  
  console.log('Patient created:', patientResult.id);
}

await seed();
