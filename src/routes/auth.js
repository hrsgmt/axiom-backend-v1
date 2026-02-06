import bcrypt from "bcryptjs";
import { createUser, findUser } from "../store/users.js";
import { signAccess, signRefresh } from "../utils/tokens.js";

export default async function auth(app) {

  app.post("/auth/register", async (req, reply) => {
    const { email, password } = req.body;
    if (!email || !password) return reply.code(400).send({ error: "Missing" });
    if (findUser(email)) return reply.code(400).send({ error: "Exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = createUser(email, hash);

    return { registered: true, user: { id: user.id, email: user.email } };
  });

  app.post("/auth/login", async (req, reply) => {
    const { email, password } = req.body;
    const user = findUser(email);
    if (!user || !(await bcrypt.compare(password, user.password)))
      return reply.code(401).send({ error: "Invalid credentials" });

    const payload = { id: user.id, email: user.email };
    const accessToken = signAccess(payload);
    const refreshToken = signRefresh(payload);

    reply.setCookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/auth/refresh"
    });

    return { login: true, token: accessToken };
  });

  app.post("/auth/logout", async (_, reply) => {
    reply.clearCookie("refreshToken", { path: "/api/auth/refresh" });
    return { logout: true };
  });
}
