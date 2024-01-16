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
    this.router.post("/update-point", this.controller.updatePoint);
    this.router.get("/user/:email", this.controller.getUser);
    this.router.get("/users", this.controller.getUsers);
  }

}

export default new Auth().router;
