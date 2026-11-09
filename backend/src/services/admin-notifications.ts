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
 * transaction as the financial operation or status change. External
 * push/email/SMS delivery is handled later by an outbox worker.
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

  const normalizedStatus = alert.status.toUpperCase();
  const eventKey = `transaction:${alert.transactionId}:status:${normalizedStatus}`;
  const payload = {
    transactionId: alert.transactionId,
    reference: alert.reference,
    memberId: alert.memberId,
    transactionType: alert.transactionType,
    method: alert.method,
    amountMinor: alert.amountMinor.toString(),
    currency: alert.currency,
    status: normalizedStatus
  };

  await db.outboxEvent.upsert({
    where: { eventKey },
    create: {
      eventKey,
      eventType: `FINANCIAL_TRANSACTION_STATUS_${normalizedStatus}`,
      aggregateId: alert.transactionId,
      payload
    },
    update: {}
  });

  if (admins.length === 0) return;

  await db.adminNotification.createMany({
    data: admins.map((admin) => ({
      transactionId: alert.transactionId,
      recipientUserId: admin.id,
      title: "Mizajou tranzaksyon SÒL PLUS",
      message: `${alert.transactionType} — ${alert.reference} — ${normalizedStatus}`,
      eventKey: `${eventKey}:admin:${admin.id}`,
      payload
    })),
    skipDuplicates: true
  });
}
