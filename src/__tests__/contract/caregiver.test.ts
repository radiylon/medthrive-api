import getCaregiverById from "../mocks/lambdas/get-caregiver-by-id.ts";
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { expect } from "chai";
import { caregivers } from "../data/caregivers.ts";

// To run this test:  npm run test:contract -- --grep "Caregivers"

describe('Caregivers', () => {
  describe('GET /caregivers/{caregiver_id}', () => {
    it('should return an error for an invalid event', async () => {
      const mockEvent = {} as unknown as APIGatewayProxyEventV2;

      const result = await getCaregiverById(mockEvent) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal("Error: caregiver_id is required");
    });

    it('should return an error for a missing caregiver_id', async () => {
      const mockEvent = { 
        pathParameters: { caregiver_id: undefined }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getCaregiverById(mockEvent) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal("Error: caregiver_id is required");
    });

    it('should return an error for an invalid caregiver_id', async () => {
      const mockEvent = { 
        pathParameters: { caregiver_id: 123456 }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getCaregiverById(mockEvent) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal("Error: caregiver_id is not a string");
    });

    it('should return a caregiver with a valid caregiver_id', async () => {
      const mockCaregiverId = '123e4567-e89b-12d3-a456-426614174000';

      const mockEvent = { 
        pathParameters: { caregiver_id: mockCaregiverId }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getCaregiverById(mockEvent) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(200);
      expect(result.body).to.equal(JSON.stringify(caregivers[0]));
    });
  });
});