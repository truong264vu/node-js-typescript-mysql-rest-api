import { Router } from "express";
import QuestionController from "../controllers/question.controller";

class QuestionRoutes {
  router = Router();
  controller = new QuestionController();

  constructor() {
    this.intializeRoutes();
  }

  checkUserRole = (role) => {
    return (req, res, next) => {
      const userRole = req.session.role;
      
      if (userRole && userRole === role) {
        // User has the required role, grant access
        next();
      } else {
        // User does not have the required role, deny access
        res.status(403).send({
          status: false,
          message: "Forbidden: Insufficient permissions"
        });
      }
    };
  }

  intializeRoutes() {
    // Create a new Question
    this.router.post("/", this.checkUserRole(1), this.controller.create);

    // // Retrieve all Question
    this.router.get("/", this.controller.findAll);

    // // Retrieve all published Question
    // this.router.get("/published", this.controller.findAllPublished);

    // // Retrieve a single Question with id
    this.router.get("/:id", this.controller.findOne);

    // // Update a Question with id
    this.router.post("/:id", this.checkUserRole(1), this.controller.update);

    // // Delete a Tutorial with id
    // this.router.delete("/:id", this.controller.delete);

    // // Delete all Question
    // this.router.delete("/", this.controller.deleteAll);
  }
}

export default new QuestionRoutes().router;
