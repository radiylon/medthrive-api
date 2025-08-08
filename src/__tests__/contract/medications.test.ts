import { expect } from 'chai';
import getMedications from '../../lambdas/get-medications/handler.ts';
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { medications } from '../data/medications.ts';

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
});
