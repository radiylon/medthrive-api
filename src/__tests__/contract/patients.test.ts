import { expect } from 'chai';
import getPatients from '../mocks/lambdas/get-patients.ts';
import getPatientById from '../mocks/lambdas/get-patient-by-id.ts';
import createPatient from '../mocks/lambdas/create-patient.ts';
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { patients } from '../data/patients.ts';

// To run this test:  npm run test:contract -- --grep "Patients"

describe('Patients', () => {
  describe('GET /patients', () => {
    it('should return a list of patients', async () => {
      const mockEvent = {} as unknown as APIGatewayProxyEventV2;

      const result = await getPatients(mockEvent) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(200);
      expect(result.body).to.equal(JSON.stringify(patients));
    });
  });
  
  describe('GET /patients/{patient_id}', () => {
    it('should return an error for an invalid event', async () => {
      const mockEvent = {} as unknown as APIGatewayProxyEventV2;

      const result = await getPatientById(mockEvent) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal("Error: patient_id is required");
    });
  
    it('should return an error if patient_id is not a string', async () => {
      const mockEvent = {
        pathParameters: {
          patient_id: 123456
        }
      } as unknown as APIGatewayProxyEventV2;
  
      const result = await getPatientById(mockEvent) as APIGatewayProxyStructuredResultV2;
  
      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal("Error: patient_id is not a string");
    });

    it('should return an error if no patients are found', async () => {
      const mockEvent = {
        pathParameters: {
          patient_id: 'nonexistent-patient-id'
        }
      } as unknown as APIGatewayProxyEventV2;
      
      const result = await getPatientById(mockEvent) as APIGatewayProxyStructuredResultV2;
  
      expect(result.statusCode).to.equal(500);
      expect(result.body).to.equal("Error: Patient not found");
    });
  
    it('should return a patient for a valid patient_id', async () => {
      const mockEvent = {
        pathParameters: {
          patient_id: '223e4567-e89b-12d3-a456-426614174000'
        }
      } as unknown as APIGatewayProxyEventV2;
  
      const result = await getPatientById(mockEvent) as APIGatewayProxyStructuredResultV2;
      const mockPatient = patients.find(patient => patient.id === mockEvent.pathParameters?.patient_id);
  
      expect(result.statusCode).to.equal(200);
      expect(result.body).to.equal(JSON.stringify(mockPatient));
    });
  });

  describe('POST /patients', () => {
    it('should return an error if the request body is invalid', async () => {
      const mockEvent = {} as unknown as APIGatewayProxyEventV2;

      const result = await createPatient(mockEvent) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal("Error: Invalid request body");
    });

    it('should return an error if the request body is missing required fields', async () => {
      const mockEvent = {
        body: JSON.stringify({})
      } as unknown as APIGatewayProxyEventV2;

      const result = await createPatient(mockEvent) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal("Error: Missing required fields");
    });

    it('should return a success message if a patient is created', async () => {
      const mockEvent = {
        body: JSON.stringify({
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          phone_number: '1234567890',
          date_of_birth: '1990-01-01',
          caregiver_id: '123e4567-e89b-12d3-a456-426614174000'
        })
      } as unknown as APIGatewayProxyEventV2;

      const result = await createPatient(mockEvent) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(200);
      expect(result.body).to.equal(JSON.stringify('Patient created successfully'));
    });
  });
});
