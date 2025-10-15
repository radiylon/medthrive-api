import { expect } from 'chai';
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { schedules } from '../data/schedules.ts';
import getSchedulesByMedicationId from '../mocks/lambdas/get-schedules-by-medication-id.ts';
import markSchedule from '../mocks/lambdas/mark-schedule.ts';

// To run this test:  pnpm run test:contract -- --grep "Schedules"

describe('Schedules', () => {
  describe('GET /medications/{medication_id}/schedules', () => {
    it('should return an error if medication_id is undefined', async () => {
      const event = {
        pathParameters: {
          medication_id: undefined
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getSchedulesByMedicationId(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal('Error: medication_id is required');
    });

    it('should return an empty array if no schedules are found for the medication_id', async () => {
      const event = {
        pathParameters: {
          medication_id: 'non-existent-medication-id'
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getSchedulesByMedicationId(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(200);
      expect(result.body).to.equal(JSON.stringify([]));
    });

    it('should return the schedules for a valid medication_id', async () => {
      const mockMedicationId = schedules[0].medication_id;
      const event = {
        pathParameters: {
          medication_id: mockMedicationId
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await getSchedulesByMedicationId(event) as APIGatewayProxyStructuredResultV2;
      
      const mockSchedules = schedules.filter(schedule => schedule.medication_id === mockMedicationId);
      expect(result.statusCode).to.equal(200);
      expect(result.body).to.equal(JSON.stringify(mockSchedules));
    });
  });

  describe('PATCH /schedules/{schedule_id}/taken', () => {
    it('should return an error if schedule_id is undefined', async () => {
      const event = {
        pathParameters: {
          schedule_id: undefined
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await markSchedule(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal('Error: schedule_id is required');
    });

    it('should return an error if schedule is not found', async () => {
      const event = {
        pathParameters: {
          schedule_id: 'non-existent-schedule-id'
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await markSchedule(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(500);
      expect(result.body).to.equal('Error: Schedule not found');
    });

    it('should mark a schedule as taken successfully', async () => {
      const mockSchedule = schedules.find(s => !s.taken_at);
      const event = {
        pathParameters: {
          schedule_id: mockSchedule?.id
        }
      } as unknown as APIGatewayProxyEventV2;

      const result = await markSchedule(event) as APIGatewayProxyStructuredResultV2;

      expect(result.statusCode).to.equal(200);
      expect(result.body).to.equal(JSON.stringify('Schedule successfully marked as taken'));
    });
  });
});
