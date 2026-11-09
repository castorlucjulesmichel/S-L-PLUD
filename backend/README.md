# SÒL PLUS API — Backend foundation

This folder contains the first backend scaffold for SÒL PLUS SUPER.

## Included
- Fastify + TypeScript API server
- Security headers and basic rate limiting
- Zod environment validation
- PostgreSQL Prisma schema for users, wallets, financial transactions, ledger entries, admin notifications, and audit logs
- Health endpoint at `/health`

## Local setup
1. Install Node.js 22 or a supported current LTS release.
2. Copy `.env.example` to `.env` and set a private PostgreSQL connection string.
3. Run `npm install`.
4. Run `npm run db:generate`.
5. Run `npm run db:migrate` after confirming the database is disposable or backed up.
6. Run `npm run dev`.

## Important safety boundary
This scaffold is not a live bank and does not process money. It intentionally has no registration, authentication, deposit, withdrawal, payment-provider or balance-changing endpoints yet. Never expose it publicly as a financial service until authentication, authorization, ledger posting, transaction workflows, notification delivery, testing, legal review and provider agreements are complete.

Store money as integer minor units (for HTG, gourdes in centimes) in the database. Do not calculate or trust balances from frontend values. Financial posting must be atomic and auditable. Never commit `.env` or provider secrets.
