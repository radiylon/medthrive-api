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
          profile: input?.stage === "production" ? "radiylon-production" : "radiylon-develop",
          region: "us-west-1",
        },
      },
    };
  },
  console: {
    autodeploy: {
      target(event) {
        if (event.type === "branch" && event.branch === "main" && event.action === "pushed") {
          return { stage: "production" };
        }
      }
    }
  },
  async run() {
    const vpc = new sst.aws.Vpc("MedVpc", { bastion: true, nat: "ec2" });
    const rds = new sst.aws.Postgres("MedDatabase", { 
      vpc,
      version: "16.8",
      proxy: true,
    });

    new sst.x.DevCommand("Studio", {
      link: [rds],
      dev: {
        command: "npx drizzle-kit studio",
      },
    });

    const MEDTHRIVE_UI_URL = process.env.MEDTHRIVE_UI_URL || "";

    const api = new sst.aws.ApiGatewayV2("MedApi", { 
      vpc, 
      link: [rds],
      cors: {
        allowHeaders: ["*"],
        allowMethods: ["*"],
        allowOrigins: [MEDTHRIVE_UI_URL]
      }
    });
    
    // get-patients
    api.route("GET /patients", {
      handler: "src/lambdas/get-patients/handler.default",
      vpc,
      link: [rds],
    });

    // create-patient
    api.route("POST /patients", {
      handler: "src/lambdas/create-patient/handler.default",
      vpc,
      link: [rds],
    });

    // get-patient-by-id
    api.route("GET /patients/{patient_id}", {
      handler: "src/lambdas/get-patient-by-id/handler.default",
      vpc,
      link: [rds],
    });
    
    // get-patient-medications
    api.route("GET /patients/{patient_id}/medications", {
      handler: "src/lambdas/get-medications-by-patient-id/handler.default",
      vpc,
      link: [rds],
    });

    // get-medication-by-id
    api.route("GET /medications/{medication_id}", {
      handler: "src/lambdas/get-medication-by-id/handler.default",
      vpc,
      link: [rds],
    });

    // create-medication
    api.route("POST /medications", {
      handler: "src/lambdas/create-medication/handler.default",
      vpc,
      link: [rds],
    });

    // patch-medication
    api.route("PATCH /medications", {
      handler: "src/lambdas/patch-medication/handler.default",
      vpc,
      link: [rds],
    });

    // get-schedules-by-medication-id
    api.route("GET /medications/{medication_id}/schedules", {
      handler: "src/lambdas/get-schedules-by-medication-id/handler.default",
      vpc,
      link: [rds],
    });

    // mark-schedule
    api.route("PATCH /schedules/{schedule_id}/taken", {
      handler: "src/lambdas/mark-schedule/handler.default",
      vpc,
      link: [rds],
    });

    return { api: api.url, host: rds.host, port: rds.port, user: rds.username, password: rds.password, database: rds.database };
  },
});