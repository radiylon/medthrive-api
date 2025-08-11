/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "medthrive",
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
    const vpc = new sst.aws.Vpc("MedthriveVpc", { bastion: true, nat: "ec2" });
    const rds = new sst.aws.Postgres("MedthrivePostgres", { vpc });

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

    api.route("GET /caregivers/{caregiver_id}/patients", {
      handler: "src/lambdas/get-patients/handler.default"
    });

    api.route("GET /patients/{patient_id}", {
      handler: "src/lambdas/get-patient-by-id/handler.default"
    });
    
    api.route("GET /patients/{patient_id}/medications", {
      handler: "src/lambdas/get-medications/handler.default"
    });

    api.route("GET /patients/{patient_id}/medications/{medication_id}", {
      handler: "src/lambdas/get-medication-by-id/handler.default"
    });

    api.route("POST /patients/{patient_id}/medications", {
      handler: "src/lambdas/post-medications/handler.default"
    });

    api.route("PATCH /patients/{patient_id}/medications/{medication_id}", {
      handler: "src/lambdas/patch-medications/handler.default"
    });

    api.route("GET /medications/{medication_id}/schedules", {
      handler: "src/lambdas/get-schedules-by-medication-id/handler.default"
    });

    api.route("GET /schedules/{schedule_id}", {
      handler: "src/lambdas/get-schedule-by-id/handler.default"
    });

    api.route("PATCH /schedules/{schedule_id}/taken", {
      handler: "src/lambdas/mark-schedule/handler.default"
    });

    return { api: api.url };
  },
});