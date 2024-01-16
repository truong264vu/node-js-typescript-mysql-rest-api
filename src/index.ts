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
      origin: "*",  // Allow requests only from this origin
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",  // Specify the allowed HTTP methods
      credentials: true,  // Include cookies and HTTP authentication headers with requests
      optionsSuccessStatus: 204,  // Set the status code for successful preflight requests
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}
