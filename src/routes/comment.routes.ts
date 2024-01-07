import { Router } from "express";
import CommentController  from "../controllers/comment.controller";

class Auth {
  router = Router();
  controller = new CommentController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/", this.controller.create);
    this.router.get("/:id", this.controller.get);
  }
}

export default new Auth().router;
