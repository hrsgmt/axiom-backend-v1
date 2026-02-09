import cors from "cors";
import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";

import loginRoute from "./routes/auth/login.js";
import refreshRoute from "./routes/auth/refresh.js";
import logoutRoute from "./routes/auth/logout.js";
import meRoute from "./routes/me.js";

const app = Fastify({ logger: true });
app.use(cors());
app.use((req,res,next)=>{res.header("Access-Control-Allow-Origin","*");res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");next();});
app.options("*", (req,res)=>res.sendStatus(200));
app.options("*", (req,res)=>res.sendStatus(200));

await app.register(cors, {
  origin: true,
  credentials: true
});

await app.register(cookie);

await app.register(loginRoute, { prefix: "/api/auth" });
await app.register(refreshRoute, { prefix: "/api/auth" });
await app.register(logoutRoute, { prefix: "/api/auth" });
await app.register(meRoute, { prefix: "/api" });

app.get("/", () => ({ ok: true }));

await app.listen({ port: process.env.PORT || 4000, host: "0.0.0.0" });
app.get("/__proof__", async () => ({ build: "NEW_SERVER_OK" }));
// rebuild Mon Feb  9 01:18:55 IST 2026

app.get("/whoami", async () => ({ repo:"axiom-backend-strong", build:"NEW", time:Date.now() }));
