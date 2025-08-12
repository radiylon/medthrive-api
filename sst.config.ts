/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "medthrive",
      // removal: input?.stage === "production" ? "retain" : "remove",
      // protect: ["production"].includes(input?.stage),
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
    const vpc = new sst.aws.Vpc("MedthriveVpc", { bastion: true, nat: "ec2" });
    const rds = new sst.aws.Postgres("MedthriveDatabase", { 
      vpc,
      version: "16.8",
      proxy: true
    });

    new sst.x.DevCommand("Studio", {
      link: [rds],
      dev: {
        command: "npx drizzle-kit studio",
      },
    });

    const api = new sst.aws.ApiGatewayV2("MedthriveApi", { 
      vpc, 
      link: [rds],
      cors: {
        allowHeaders: ["*"],
        allowMethods: ["*"],
        allowOrigins: ["http://localhost:3000", "https://d3iqr4nk3h4ypf.cloudfront.net"]
      }
    });

    // get-caregiver-patients
    api.route("GET /caregivers/{caregiver_id}/patients", {
      handler: "src/lambdas/get-patients-by-caregiver-id/handler.default"
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

    // get-schedules-by-medication-id
    api.route("GET /medications/{medication_id}/schedules", {
      handler: "src/lambdas/get-schedules-by-medication-id/handler.default"
    });

    // get-schedule-by-id
    api.route("GET /schedules/{schedule_id}", {
      handler: "src/lambdas/get-schedule-by-id/handler.default"
    });

    // mark-schedule
    api.route("PATCH /schedules/{schedule_id}/taken", {
      handler: "src/lambdas/mark-schedule/handler.default"
    });

    return { api: api.url };
  },
});