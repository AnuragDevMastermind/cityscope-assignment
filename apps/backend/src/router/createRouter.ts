import { Router } from "express";
import authentication from "./routes/authentication.routes";
import users from "./routes/user.routes";
import comment from "./routes/comment.routes";
import post from "./routes/post.routes"

const router = Router();

export default (): Router => {
  authentication(router);
  users(router);
  comment(router);
  post(router)
  return router;
};
