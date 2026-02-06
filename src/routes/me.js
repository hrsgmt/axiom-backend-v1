import { verifyAccess } from "../utils/tokens.js";

export default async function me(app) {
  app.get("/me", async (req, reply) => {
    const auth = req.headers.authorization;
    if (!auth) return reply.code(401).send({ error: "No auth" });

    try {
      const token = auth.replace("Bearer ", "");
      return { user: verifyAccess(token) };
    } catch {
      return reply.code(401).send({ error: "Invalid token" });
    }
  });
}
