import { Prisma, PrismaClient } from "@prisma/client";
import { queueAdminTransactionAlert } from "./admin-notifications";

type DbClient = PrismaClient | Prisma.TransactionClient;

export type LedgerPosting = {
  walletId: string;
  amountMinor: bigint;
  currency: string;
  entryType: string;
};

/**
 * Posts a balanced, immutable set of ledger entries and completes its
 * financial transaction atomically. The caller MUST pass a Prisma
 * transaction client (usually from prisma.$transaction).
 *
 * Amounts are signed integer minor units: debits are negative and credits
 * are positive. At least two entries are required and their sum must be 0.
 */
export async function postBalancedLedgerTransaction(
  db: Prisma.TransactionClient,
  transactionId: string,
  postings: LedgerPosting[],
  actorUserId?: string
): Promise<void> {
  if (postings.length < 2) {
    throw new Error("LEDGER_REQUIRES_TWO_ENTRIES");
  }

  const currencies = new Set(postings.map((entry) => entry.currency));
  if (currencies.size !== 1) {
    throw new Error("LEDGER_CURRENCY_MISMATCH");
  }

  const walletIds = postings.map((entry) => entry.walletId);
  if (new Set(walletIds).size !== walletIds.length) {
    throw new Error("LEDGER_DUPLICATE_WALLET");
  }

  const total = postings.reduce((sum, entry) => sum + entry.amountMinor, 0n);
  if (total !== 0n) {
    throw new Error("LEDGER_NOT_BALANCED");
  }

  if (postings.some((entry) => entry.amountMinor === 0n || !entry.entryType.trim())) {
    throw new Error("LEDGER_INVALID_ENTRY");
  }

  const transaction = await db.financialTransaction.findUnique({
    where: { id: transactionId },
    select: {
      id: true,
      reference: true,
      memberId: true,
      type: true,
      method: true,
      status: true,
      amountMinor: true,
      currency: true
    }
  });

  if (!transaction) throw new Error("TRANSACTION_NOT_FOUND");
  if (!["APPROVED", "PROCESSING"].includes(transaction.status)) {
    throw new Error("TRANSACTION_NOT_APPROVED_FOR_POSTING");
  }
  if (transaction.currency !== postings[0].currency) {
    throw new Error("LEDGER_TRANSACTION_CURRENCY_MISMATCH");
  }

  const existing = await db.ledgerEntry.findMany({
    where: { transactionId },
    select: { walletId: true, amountMinor: true, currency: true, entryType: true }
  });

  if (existing.length > 0) {
    const same = existing.length === postings.length && postings.every((posting) =>
      existing.some((entry) =>
        entry.walletId === posting.walletId &&
        entry.amountMinor === posting.amountMinor &&
        entry.currency === posting.currency &&
        entry.entryType === posting.entryType
      )
    );
    if (!same) throw new Error("LEDGER_ALREADY_POSTED_WITH_DIFFERENT_ENTRIES");
    return;
  }

  await db.ledgerEntry.createMany({
    data: postings.map((posting) => ({
      transactionId,
      walletId: posting.walletId,
      amountMinor: posting.amountMinor,
      currency: posting.currency,
      entryType: posting.entryType
    }))
  });

  await db.financialTransaction.update({
    where: { id: transactionId },
    data: { status: "COMPLETED", completedAt: new Date() }
  });

  await db.auditLog.create({
    data: {
      actorUserId,
      transactionId,
      action: "LEDGER_POSTED",
      entityType: "FinancialTransaction",
      entityId: transactionId,
      metadata: {
        entryCount: postings.length,
        currency: postings[0].currency,
        totalDebitsAndCreditsNet: "0"
      }
    }
  });

  await queueAdminTransactionAlert(db, {
    transactionId: transaction.id,
    reference: transaction.reference,
    memberId: transaction.memberId,
    transactionType: transaction.type,
    method: transaction.method,
    amountMinor: transaction.amountMinor,
    currency: transaction.currency,
    status: "COMPLETED"
  });
}
