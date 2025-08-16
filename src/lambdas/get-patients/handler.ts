import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import PatientService from '../../services/PatientService.ts';

export default async function getPatients(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  try {
    console.log("Start getPatients request");
    
    const patientService = new PatientService();
    console.log("Patient service created");
    const patients = await patientService.getPatients();
    console.log("Patients fetched", patients);

    return {
      statusCode: 200,
      body: JSON.stringify(patients)
    };
  } catch (err) {
    console.error("Error fetching patients", err);
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to fetch patients"
    };
  }
};
