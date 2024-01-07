import { Router } from "express";
import QuestionController from "../controllers/question.controller";

class QuestionRoutes {
  router = Router();
  controller = new QuestionController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Question
    this.router.post("/", this.controller.create);

    // // Retrieve all Question
    this.router.get("/", this.controller.findAll);

    // // Retrieve all published Question
    // this.router.get("/published", this.controller.findAllPublished);

    // // Retrieve a single Question with id
    this.router.get("/:id", this.controller.findOne);

    // // Update a Question with id
    this.router.post("/:id", this.controller.update);

    // // Delete a Tutorial with id
    // this.router.delete("/:id", this.controller.delete);

    // // Delete all Question
    // this.router.delete("/", this.controller.deleteAll);
  }
}

export default new QuestionRoutes().router;
