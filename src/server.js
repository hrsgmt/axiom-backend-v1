import usersRoute from "./routes/users.js";
console.log("SERVER_FILE_VERSION = 2026-02-09-LIKES");
REMOVED from "./routes/users.js";
import postsRoute from "./routes/posts.js";
import profileRoute from "./routes/profile.js";
import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";

import loginRoute from "./routes/auth/login.js";
import refreshRoute from "./routes/auth/refresh.js";
import logoutRoute from "./routes/auth/logout.js";
import meRoute from "./routes/me.js";
const app = Fastify({ logger: true });
await app.register(cors, {
  origin: true,
  credentials: true
});
await app.register(cookie);
await app.register(loginRoute, { prefix: "/api/auth" });
await app.register(refreshRoute, { prefix: "/api/auth" });
await app.register(logoutRoute, { prefix: "/api/auth" });
await app.register(meRoute, { prefix: "/api" });
await app.register(profileRoute, { prefix: "/api" });
await app.register(postsRoute, { prefix: "/api" });
console.log("POSTS ROUTE REGISTERED");
app.get("/", () => ({ ok: true }));
app.get("/__proof__", async () => ({ build: "NEW_SERVER_OK" }));
// rebuild Mon Feb  9 01:18:55 IST 2026
app.get("/whoami", async () => ({ repo:"axiom-backend-strong", build:"NEW", time:Date.now() }));
console.log(app.printRoutes());
await app.listen({ port: process.env.PORT || 4000, host: "0.0.0.0" });
