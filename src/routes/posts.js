import { authGuard } from "../middleware/auth.js";
import { createPost, listPosts, deletePost } from "../store/posts.js";

export default async function (app) {

  app.post("/posts", { preHandler: authGuard }, async (req) => {
    const user = req.user;
    const { content } = req.body;
    const post = createPost(user.id, content);
    return { post };
  });

  app.get("/posts", { preHandler: authGuard }, async (req) => {
    const user = req.user;
    return { posts: listPosts(user.id) };
  });

  app.delete("/posts/:id", { preHandler: authGuard }, async (req) => {
    const user = req.user;
    const ok = deletePost(user.id, req.params.id);
    return { success: ok };
  });

}
