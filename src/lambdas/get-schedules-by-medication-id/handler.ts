import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import ScheduleService from '../../services/ScheduleService.ts';
import { getSchedulesByMedicationIdSchema } from '../../schemas.ts';
import { getValidationErrorMessage } from '../../utils.ts';

const scheduleService = new ScheduleService();

export default async function getSchedulesByMedicationId(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const validationResult = getSchedulesByMedicationIdSchema.safeParse(event.pathParameters);
    
    if (!validationResult.success) {
      console.error("Error: Validation failed for get schedules by medication ID ", validationResult.error);
      return {
        statusCode: 400,
        body: getValidationErrorMessage(validationResult)
      };
    }
  
    const schedules = await scheduleService.getSchedulesByMedicationId(validationResult.data.medication_id);
  
    return {
      statusCode: 200,
      body: JSON.stringify(schedules)
    };
  } catch (err) {
    console.error("Error fetching schedules by medication ID", err);
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to get schedules"
    };
  }
};
