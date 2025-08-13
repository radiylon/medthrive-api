import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import CaregiverService from '../../services/CaregiverService.ts';

export default async function getCaregiverById(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  try {
    const caregiverId = event.pathParameters?.caregiver_id;

    if (!caregiverId) {
      return {
        statusCode: 400,
        body: "Error: caregiver_id is required"
      };
    }

    if (caregiverId && typeof caregiverId !== 'string') {
      return {
        statusCode: 400,
        body: "Error: caregiver_id is not a string"
      };
    }

    const caregiverService = new CaregiverService();
    const caregiver = await caregiverService.getCaregiverById(caregiverId as string);

    return {
      statusCode: 200,
      body: JSON.stringify(caregiver)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to fetch caregiver"
    };
  }
};