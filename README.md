# medthrive-api

MEDTHRIVE is an example medication management app for caregivers.  I built this to learn more about IaC using a framework like SST.  This is the API powering the MVP.

Built using TypeScript, AWS API Gateway, AWS Lambda, and Amazon RDS via SST.

[Project Notes](https://docs.google.com/document/d/1lZQ15cpvRAOPbPFhcNsnM_V71i-V8CkYG91ndv7g3u0/edit?tab=t.0Z)

## Tech Stack

### Core Technologies
- TypeScript
- Node.js

### Infrastructure (via SST)
- AWS API Gateway
- AWS Lambda
- Amazon RDS (PostgreSQL)
- AWS VPC

### Database Tools
- drizzle-orm (database queries/mutations)
- drizzle-kit (database migrations)

## Installation

After cloning down the repo, please run `npm install` to install all necessary dependencies.

This project utilizes AWS via sst.dev. In order to properly run the application, you will need to:

1. Have an AWS account and credentials
2. Install and configure the AWS CLI
3. Follow the [SST AWS setup instructions](https://sst.dev/docs/aws-accounts/)
4. Replace the profiles in `sst.config.ts` with your own account profiles
5. Run `npm run dev` to start local development
6. In a separate terminal window, navigate to the project and run `npm run db:push` to initialize tables locally

## Testing

The project uses Mocha and Chai for testing. Tests are organized into:

- **Contract Tests** (`src/__tests__/contract/`): API endpoint behavior tests
- **Unit Tests** (`src/__tests__/unit/`): Individual service and utility tests
- **Mock Data** (`src/__tests__/data/`): Test fixtures and mock data
- **Mock Services** (`src/__tests__/mocks/`): Mock implementations for testing

### Test Commands
```bash
# Run all tests
npm test

# Run only contract tests
npm run test:contract

# Run specific test file or pattern
npm run test:contract -- --grep "Medications"
```

## Available Scripts

```bash
# Start local development via SST
npm run dev

# Push database schema changes
npm run db:push

# Reset local database (drops all tables and recreates schema)
npm run db:reset

# Seed local database with initial data
npm run db:seed
```

> ⚠️ Note: `db:reset` and `db:seed` are intended for local development only. Use with caution as they will modify your database data.
