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
    const api = new sst.aws.ApiGatewayV2("MedicationsApi");

    api.route("GET /medications/{patientId}", "src/get-medications/handler.ts");

    return { api: api.url };
  },
});
