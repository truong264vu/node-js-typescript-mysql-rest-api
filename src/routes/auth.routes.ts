import { Router } from "express";
import AuthController  from "../controllers/auth.controller";

class Auth {
  router = Router();
  controller = new AuthController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/login", this.controller.login);
  }
}

export default new Auth().router;
