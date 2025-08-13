import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import seed from '../../scripts/seed';

export default async function seedDatabase(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    await seed();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Database seeded successfully' })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to seed database"
    };
  }
};
