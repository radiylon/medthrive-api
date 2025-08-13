import seed from "../../scripts/seed.ts";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

export default async function seedDatabase(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  try {
    await seed();
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Database seeded successfully',
      })
    };
  } catch (error) {
    console.error('Error seeding database:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error seeding database',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
}
