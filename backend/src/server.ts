import Fastify from "fastify";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  HOST: z.string().default("127.0.0.1"),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  LOG_LEVEL: z.string().default("info")
});

const env = envSchema.parse(process.env);
const app = Fastify({
  logger: { level: env.LOG_LEVEL },
  trustProxy: env.NODE_ENV === "production"
});

await app.register(helmet);
await app.register(rateLimit, {
  max: 100,
  timeWindow: "1 minute"
});

app.get("/health", async () => ({
  status: "ok",
  service: "sol-plus-api",
  environment: env.NODE_ENV,
  timestamp: new Date().toISOString()
}));

app.get("/api/v1", async () => ({
  name: "SÒL PLUS API",
  version: "0.1.0",
  status: "foundation",
  message: "API fondasyon an disponib; sèvis finansye yo poko aktive."
}));

app.setNotFoundHandler(async (_request, reply) => {
  return reply.code(404).send({
    error: "NOT_FOUND",
    message: "Wout sa a pa egziste."
  });
});

app.setErrorHandler((error, _request, reply) => {
  app.log.error(error);
  return reply.code(500).send({
    error: "INTERNAL_SERVER_ERROR",
    message: "Yon erè entèn rive."
  });
});

try {
  await app.listen({ host: env.HOST, port: env.PORT });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
