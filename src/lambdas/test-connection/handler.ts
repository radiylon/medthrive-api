import { Resource } from "sst";
import PatientService from "../../services/PatientService.ts";

export default async function testConnection(event: any) {
  try {
    console.log("🔍 Testing connection setup...");
    
    const host = Resource.MedDatabase.host;
    const database = Resource.MedDatabase.database;

    const patientService = new PatientService();
    const patients = await patientService.getPatients();

    console.log("🔍 Patients fetched", patients);
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: "Connection test",
        data: {
          host,
          database,
          patients,
        },
      })
    };
  } catch (err) {
    console.error("Error fetching patients", err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined
      })
    };
  }
}