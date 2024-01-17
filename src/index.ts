import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from './routes';

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "https://english-daily.today",  // Allow requests from these origins
      // origin: ["http://localhost:3000", "https://english-daily.today"],  // Allow requests from these origins
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      optionsSuccessStatus: 204,
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}
