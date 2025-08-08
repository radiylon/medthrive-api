import { expect } from 'chai';
import getPatients from '../../lambdas/get-patients/handler.ts';
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { patients } from '../data/patients.ts';

describe('Patients', () => {
  describe('GET /patients/', () => {
    it('should return a list of patients if no patient_id is provided', async () => {
      const event = {
        pathParameters: {
          patient_id: undefined
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getPatients(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(200);
      expect(result.body).to.equal(JSON.stringify(patients));
    });
    
    it('should return an empty array if no patients are found', async () => {
      const event = {
        pathParameters: {
          patient_id: 'this-is-not-a-valid-patient-id'
        }
      } as unknown as APIGatewayProxyEventV2;
      
      const result = await getPatients(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(200);
      expect(result.body).to.equal(JSON.stringify([]));
    });

    it('should return a patient for a valid patient_id', async () => {
      const event = {
        pathParameters: {
          patient_id: '123e4567-e89b-12d3-a456-426614174111'
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getPatients(event) as APIGatewayProxyStructuredResultV2;
      
      const mockPatients = patients.filter(patient => patient.id === '123e4567-e89b-12d3-a456-426614174111');
      expect(result.statusCode).to.equal(200);
      expect(result.body).to.equal(JSON.stringify(mockPatients));
    });
  });
});
