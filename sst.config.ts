/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "medthrive-api",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile: input?.stage === "production" ? "radiylon-production" : "radiylon-dev",
          region: "us-west-1",
        },
      },
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("MedthriveVpc", { bastion: true });
    const rds = new sst.aws.Postgres("MedthriveDatabase", { 
      vpc,
      version: "16.8",
    });

    new sst.x.DevCommand("Studio", {
      link: [rds],
      dev: {
        command: "npx drizzle-kit studio",
      },
    });

    const BASE_APP_URL = $app.stage !== "production" 
      ? "http://localhost:3000"
      : "https://diiavvui1t903.cloudfront.net";

    const api = new sst.aws.ApiGatewayV2("MedthriveApi", { 
      vpc, 
      link: [rds],
      cors: {
        allowHeaders: ["*"],
        allowMethods: ["*"],
        allowOrigins: [BASE_APP_URL]
      }
    });
    
    // get-patients
    api.route("GET /patients", {
      handler: "src/lambdas/get-patients/handler.default"
    });

    // create-patient
    api.route("POST /patients", {
      handler: "src/lambdas/create-patient/handler.default"
    });

    // get-patient-by-id
    api.route("GET /patients/{patient_id}", {
      handler: "src/lambdas/get-patient-by-id/handler.default"
    });
    
    // get-patient-medications
    api.route("GET /patients/{patient_id}/medications", {
      handler: "src/lambdas/get-medications-by-patient-id/handler.default"
    });

    // get-medication-by-id
    api.route("GET /medications/{medication_id}", {
      handler: "src/lambdas/get-medication-by-id/handler.default"
    });

    // create-medication
    api.route("POST /medications", {
      handler: "src/lambdas/create-medication/handler.default"
    });

    // patch-medication
    api.route("PATCH /medications", {
      handler: "src/lambdas/patch-medication/handler.default"
    });

    // get-schedules-by-medication-id
    api.route("GET /medications/{medication_id}/schedules", {
      handler: "src/lambdas/get-schedules-by-medication-id/handler.default"
    });

    // mark-schedule
    api.route("PATCH /schedules/{schedule_id}/taken", {
      handler: "src/lambdas/mark-schedule/handler.default"
    });

    return { api: api.url };
  },
});