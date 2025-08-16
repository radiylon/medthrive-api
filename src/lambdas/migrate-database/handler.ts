import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { db } from '../../drizzle.ts';
import { migrate } from "drizzle-orm/node-postgres/migrator";


export default async function migrateDatabase(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    await migrate(db, { migrationsFolder: "src/db/migrations" });
    return {
      statusCode: 200,
      body: JSON.stringify('Database migrated successfully')
    };
  } catch (err) {
    console.error("Error migrating database", err);
    return {
      statusCode: 500,
      body: err instanceof Error ? err.message : "Error: Failed to migrate database"
    };
  }
};
