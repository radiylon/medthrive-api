import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import MockScheduleService from '../services/MockScheduleService.ts';
import { getSchedulesByMedicationIdSchema } from '../../../schemas.ts';
import { getValidationErrorMessage } from '../../../utils.ts';

export default async function getSchedulesByMedicationId(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const validationResult = getSchedulesByMedicationIdSchema.safeParse(event.pathParameters);
    
    if (!validationResult.success) {
      return {
        statusCode: 400,
        body: getValidationErrorMessage(validationResult)
      };
    }

    const scheduleService = new MockScheduleService();
    const schedules = await scheduleService.getSchedulesByMedicationId(validationResult.data.medication_id);
  
    return {
      statusCode: 200,
      body: JSON.stringify(schedules)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to get schedules"
    };
  }
};
