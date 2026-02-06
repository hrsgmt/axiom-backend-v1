import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";

import authRoutes from "./routes/auth.js";
import refreshRoutes from "./routes/refresh.js";
import meRoutes from "./routes/me.js";

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: true,
  credentials: true
});

await app.register(cookie);

await app.register(authRoutes, { prefix: "/api/auth" });
await app.register(refreshRoutes, { prefix: "/api/auth" });
await app.register(meRoutes, { prefix: "/api" });

app.get("/", async () => {
  return { ok: true, service: "axiom-backend-final" };
});

const PORT = process.env.PORT || 4000;
await app.listen({ port: PORT, host: "0.0.0.0" });
