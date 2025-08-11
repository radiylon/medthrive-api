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
    const rds = new sst.aws.Postgres("MedthrivePostgres", { vpc, proxy: true });

    new sst.x.DevCommand("Studio", {
      link: [rds],
      dev: {
        command: "npx drizzle-kit studio",
      },
    });

    const api = new sst.aws.ApiGatewayV2("MedthriveApi", { vpc, link: [rds] });

    api.route("GET /patients", {
      handler: "src/lambdas/get-patients/handler.default"
    });

    api.route("POST /patients", {
      handler: "src/lambdas/post-patients/handler.default"
    });

    api.route("GET /patients/{patient_id}", {
      handler: "src/lambdas/get-patients-by-id/handler.default"
    });
    
    api.route("GET /patients/{patient_id}/medications", {
      handler: "src/lambdas/get-medications/handler.default"
    });

    api.route("POST /patients/{patient_id}/medications", {
      handler: "src/lambdas/post-medications/handler.default"
    });

    return { api: api.url };
  },
});
