import { expect } from 'chai';
import getPatients from '../../lambdas/get-patients/handler.ts';
import getPatientById from '../../lambdas/get-patient-by-id/handler.ts';
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { patients } from '../data/patients.ts';

// To run this test:  npm run test:contract -- --grep "Patients"

describe('Patients', () => {
  describe('GET /patients/', () => {
    it('should return an error for an invalid event', async () => {
      const mockEvent = {} as unknown as APIGatewayProxyEventV2;

      const result = await getPatients(mockEvent) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal("Error: caregiver_id is required");
    });

    it('should return an error for an invalid caregiver_id', async () => {
      const mockEvent = { 
        body: JSON.stringify({ caregiver_id: 123456 })
      } as unknown as APIGatewayProxyEventV2;

      const result = await getPatients(mockEvent) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal("Error: caregiver_id is required");
    });

    it('should return an error for a missing caregiver_id', async () => {
      const mockEvent = { 
        body: JSON.stringify({})
      } as unknown as APIGatewayProxyEventV2;

      const result = await getPatients(mockEvent) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal("Error: caregiver_id is required");
    });

    it('should return a list of patients with valid caregiver_id', async () => {
      const mockCaregiverId = '123e4567-e89b-12d3-a456-426614174000';
      
      const mockEvent = { 
        pathParameters: {
          caregiver_id: mockCaregiverId
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getPatients(mockEvent) as APIGatewayProxyStructuredResultV2;
      const parsedResultBody = JSON.parse(result.body as string);
      const mockPatients = patients.filter(patient => patient.caregiver_id === mockCaregiverId);

      expect(result.statusCode).to.equal(200);
      expect(parsedResultBody).to.be.an('array');
      expect(result.body).to.equal(JSON.stringify(mockPatients));
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
});
