import { expect } from 'chai';
import getMedicationsByPatientId from '../../lambdas/get-medications-by-patient-id/handler.ts';
import getMedicationById from '../../lambdas/get-medication-by-id/handler.ts';
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { medications } from '../data/medications.ts';
import createMedication from '../../lambdas/create-medication/handler.ts';

// To run this test:  npm run test:contract -- --grep "Medications"

describe('Medications', () => {
  describe('GET /patients/{patient_id}/medications', () => {
    it('should return an error if patient_id is undefined', async () => {
      const event = {
        pathParameters: {
          patient_id: undefined
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getMedicationsByPatientId(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal('Error: patient_id is required');
    });

    it('should return an error if patient_id is null', async () => {
      const event = {
        pathParameters: {
          patient_id: null
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getMedicationsByPatientId(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal('Error: patient_id is required');
    });

    it('should return an error if patient_id is not a string', async () => {
      const event = {
        pathParameters: {
          patient_id: 123456
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getMedicationsByPatientId(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal('Error: patient_id is not a string');
    });

    it('should return an empty array if no medications are found for the patientId', async () => {
      const event = {
        pathParameters: {
          patient_id: 'this-is-not-a-valid-patient-id'
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getMedicationsByPatientId(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(200);
      expect(result.body).to.equal(JSON.stringify([]));
    });

    it('should return the medications for a valid patient_id', async () => {
      const event = {
        pathParameters: {
          patient_id: '123e4567-e89b-12d3-a456-426614174111'
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getMedicationsByPatientId(event) as APIGatewayProxyStructuredResultV2;
      
      const mockMedications = medications.filter(med => med.patient_id === '123e4567-e89b-12d3-a456-426614174111');
      expect(result.statusCode).to.equal(200);
      expect(result.body).to.equal(JSON.stringify(mockMedications));
    });
  });

  describe('GET /medications/{medication_id}', () => {
    it('should return an error if medication_id is undefined', async () => {
      const event = {
        pathParameters: {
          patient_id: '123e4567-e89b-12d3-a456-426614174111',
          medication_id: undefined
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getMedicationById(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal('Error: medication_id is required');
    });

    it('should return an error if medication_id is not a string', async () => {
      const event = {
        pathParameters: {
          patient_id: '123e4567-e89b-12d3-a456-426614174111',
          medication_id: 123456
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getMedicationById(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal('Error: medication_id is not a string');
    });

    it('should return an error if medication_id is not found', async () => {
      const event = {
        pathParameters: {
          patient_id: '123e4567-e89b-12d3-a456-426614174111',
          medication_id: 'this-is-not-a-valid-medication-id'
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getMedicationById(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(500);
      expect(result.body).to.equal('Error: Medication not found');
    });
  });

  describe('POST /medications', () => {
    it('should return an error for a missing event body', async () => {
      const event = {} as unknown as APIGatewayProxyEventV2;

      const result = await createMedication(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal('Error: Invalid request body');
    });

    
    it('should return an error if missing patient_id', async () => {
      const event = {
        body: JSON.stringify({
          name: 'Test Medication',
          description: 'Test Description',
          quantity: 10,
          is_active: true,
          schedule: {
            frequency: 1,
            type: 'daily',
            start_date: new Date()
          }
        })
      } as unknown as APIGatewayProxyEventV2;

      const result = await createMedication(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal('Error: Missing required fields');
    });

    it('should return an error if missing another required field', async () => {
      const event = {
        body: JSON.stringify({
          patient_id: '123e4567-e89b-12d3-a456-426614174111',
          name: 'Test Medication',
          description: 'Test Description',
          schedule: {
            frequency: 1,
            type: 'daily',
            start_date: new Date()
          }
        })
      } as unknown as APIGatewayProxyEventV2;

      const result = await createMedication(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal('Error: Missing required fields');
    });
  });
});