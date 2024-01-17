import express, { Application } from "express";
// import cors from "cors";
import Routes from './routes';

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    // Allow all origins for debugging purposes
    // app.use(cors({
    //   origin: 'http://localhost:3000',
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //   credentials: true,
    //   optionsSuccessStatus: 204,
    // }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}
