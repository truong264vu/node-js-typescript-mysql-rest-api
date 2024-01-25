import { Application } from "express";
import tutorialRoutes from "./tutorial.routes";
import questionRoutes from "./question.routes";
import homeRoutes from "./home.routes";
import authRoutes from "./auth.routes";
import commentRoutes from "./comment.routes";

export default class Routes {

  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/tutorials", tutorialRoutes);
    app.use("/api/questions", questionRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/comment", commentRoutes);
  }
}
