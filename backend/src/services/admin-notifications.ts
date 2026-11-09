import { Prisma, PrismaClient, UserRole } from "@prisma/client";

type TransactionAlert = {
  transactionId: string;
  reference: string;
  memberId: string;
  transactionType: string;
  method: string;
  amountMinor: bigint;
  currency: string;
  status: string;
};

type DbClient = PrismaClient | Prisma.TransactionClient;

/**
 * Persist an admin notification and an outbox event in the SAME database
 * transaction as the financial operation. A separate worker will deliver
 * push/email/SMS later; those external channels are intentionally not wired yet.
 */
export async function queueAdminTransactionAlert(
  db: DbClient,
  alert: TransactionAlert
): Promise<void> {
  const admins = await db.user.findMany({
    where: {
      status: "ACTIVE",
      roles: { hasSome: [UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.FINANCE_OFFICER] }
    },
    select: { id: true }
  });

  const eventKey = `transaction:${alert.transactionId}:submitted`;
  const payload = {
    transactionId: alert.transactionId,
    reference: alert.reference,
    memberId: alert.memberId,
    transactionType: alert.transactionType,
    method: alert.method,
    amountMinor: alert.amountMinor.toString(),
    currency: alert.currency,
    status: alert.status
  };

  await db.outboxEvent.upsert({
    where: { eventKey },
    create: {
      eventKey,
      eventType: "FINANCIAL_TRANSACTION_SUBMITTED",
      aggregateId: alert.transactionId,
      payload
    },
    update: {}
  });

  if (admins.length === 0) {
    // Keep the outbox event. Operational monitoring must alert if no active
    // financial administrators are configured.
    return;
  }

  await db.adminNotification.createMany({
    data: admins.map((admin) => ({
      transactionId: alert.transactionId,
      recipientUserId: admin.id,
      title: "Nouvo tranzaksyon SÒL PLUS",
      message: `${alert.transactionType} — ${alert.reference} — ${alert.status}`,
      eventKey: `${eventKey}:admin:${admin.id}`,
      payload
    })),
    skipDuplicates: true
  });
}
