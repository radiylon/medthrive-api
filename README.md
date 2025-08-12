# Medthrive API

Medthrive is an example medication management app for caregivers.  I built this to learn more about IaC using a framework like SST.  This is the API powering the MVP.

Built using TypeScript, AWS API Gateway, AWS Lambda, and Amazon RDS via SST.

[Project Notes](https://docs.google.com/document/d/1lZQ15cpvRAOPbPFhcNsnM_V71i-V8CkYG91ndv7g3u0/edit?tab=t.0Z)

## Installation

After cloning down the repo, please run `npm install` to install all necessary dependencies.

This project utilizes AWS via sst.dev.  In order to to properly run the application, you will need to ensure you have an AWS account/credentials.  You will also need to have the `aws` CLI setup. Please see these [instructions](https://sst.dev/docs/aws-accounts/) for setting this up.

Once complete, you will need to replace the profiles in `sst.config.ts` with your own account profiles.

From there, you should be able to run `npm run dev` for local development.

## Testing

To run the test suite, you can run `npm run test`.  You can also run individual test files by copying & running the command at the top of the appropriate test.
