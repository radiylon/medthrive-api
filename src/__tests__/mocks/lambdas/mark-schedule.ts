import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import MockScheduleService from '../services/MockScheduleService.ts';
import { markScheduleSchema } from '../../../schemas.ts';
import { getValidationErrorMessage } from '../../../utils.ts';

export default async function markSchedule(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const validationResult = markScheduleSchema.safeParse(event.pathParameters);
    
    if (!validationResult.success) {
      return {
        statusCode: 400,
        body: getValidationErrorMessage(validationResult)
      };
    }

    const { schedule_id: scheduleId } = validationResult.data;

    const scheduleService = new MockScheduleService();
    await scheduleService.markScheduleAsTaken(scheduleId);
  
    return {
      statusCode: 200,
      body: JSON.stringify('Schedule successfully marked as taken')
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to mark schedule as taken"
    };
  }
};
