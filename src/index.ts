import express, { Application } from "express";
import cors from "cors";
import Routes from './routes';
const session = require('express-session');

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    // Allow all origins for debugging purposes
    app.use(cors({
      origin: ['http://localhost:3000', 'https://english-daily.today'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      optionsSuccessStatus: 204,
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(session({
      resave: true, 
      saveUninitialized: true, 
      secret: 'somesecret', 
      cookie: { maxAge: 60000 }}));
  }
}
