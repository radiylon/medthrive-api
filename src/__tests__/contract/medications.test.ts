import { expect } from 'chai';
import getMedications from '../../lambdas/get-medications/handler.ts';
import getMedicationById from '../../lambdas/get-medication-by-id/handler.ts';
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { medications } from '../data/medications.ts';
import postMedications from '../../lambdas/post-medications/handler.ts';
import patchMedications from '../../lambdas/patch-medications/handler.ts';

// To run this test:  npm run test:contract -- --grep "Medications"

describe('Medications', () => {
  describe('GET /patients/{patient_id}/medications', () => {
    it('should return an error if patient_id is undefined', async () => {
      const event = {
        pathParameters: {
          patient_id: undefined
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getMedications(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal('Error: patient_id is required');
    });

    it('should return an error if patient_id is null', async () => {
      const event = {
        pathParameters: {
          patient_id: null
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getMedications(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal('Error: patient_id is required');
    });

    it('should return an error if patient_id is not a string', async () => {
      const event = {
        pathParameters: {
          patient_id: 123456
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getMedications(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal('Error: patient_id is not a string');
    });

    it('should return an empty array if no medications are found for the patientId', async () => {
      const event = {
        pathParameters: {
          patient_id: 'this-is-not-a-valid-patient-id'
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getMedications(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(200);
      expect(result.body).to.equal(JSON.stringify([]));
    });

    it('should return the medications for a valid patient_id', async () => {
      const event = {
        pathParameters: {
          patient_id: '123e4567-e89b-12d3-a456-426614174111'
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getMedications(event) as APIGatewayProxyStructuredResultV2;
      
      const mockMedications = medications.filter(med => med.patient_id === '123e4567-e89b-12d3-a456-426614174111');
      expect(result.statusCode).to.equal(200);
      expect(result.body).to.equal(JSON.stringify(mockMedications));
    });
  });

  describe('GET /patients/{patient_id}/medications/{medication_id}', () => {
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

  describe('POST /patients/{patient_id}/medications', () => {
    it('should return an error if patient_id is undefined', async () => {
      const event = {
        pathParameters: {
          patient_id: undefined
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await postMedications(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal('Error: patient_id is required');
    });

    it('should create a medication for a valid patient_id and event body', async () => {
      const testData = {
        name: 'Test Medication',
        description: 'Test Description',
        quantity: 10,
        is_active: true,
        schedule: {
          frequency: 1,
          type: 'daily' as const,
          start_date: new Date()
        }
      };

      const event = {
        pathParameters: {
          patient_id: '123e4567-e89b-12d3-a456-426614174111'
        },
        body: JSON.stringify(testData)
      } as unknown as APIGatewayProxyEventV2;

      const result = await postMedications(event) as APIGatewayProxyStructuredResultV2;
      expect(result.statusCode).to.equal(200);
      
      const responseBody = JSON.parse(result.body as string);
      
      // Check required fields match input
      expect(responseBody).to.include({
        patient_id: '123e4567-e89b-12d3-a456-426614174111',
        name: testData.name,
        description: testData.description,
        quantity: testData.quantity,
        is_active: testData.is_active
      });

      // Check schedule structure
      expect(responseBody).to.have.property('schedule')
        .that.deep.includes({
          frequency: testData.schedule.frequency,
          type: testData.schedule.type
        });
    });
  });

  describe('PATCH /patients/{patient_id}/medications/{medication_id}', () => {
    it('should return an error if medication_id is undefined', async () => {
      const event = {
        pathParameters: {
          patient_id: '123e4567-e89b-12d3-a456-426614174111',
          medication_id: undefined
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await patchMedications(event) as APIGatewayProxyStructuredResultV2;

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

      const result = await patchMedications(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal('Error: medication_id is not a string');
    });
    
    it('should update a medication for a valid patient_id and medication_id', async () => {
      const event = {
        pathParameters: {
          patient_id: '123e4567-e89b-12d3-a456-426614174111',
          medication_id: '123e4567-e89b-12d3-a456-426614174111'
        },
        body: JSON.stringify({
          is_active: false,
        })
      } as unknown as APIGatewayProxyEventV2;

      const result = await patchMedications(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(200);

      const responseBody = JSON.parse(result.body as string);

      expect(responseBody).to.include({
        is_active: false
      });
    });
  });
});