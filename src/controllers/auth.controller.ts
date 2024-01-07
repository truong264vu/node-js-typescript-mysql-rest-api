import { Request, Response } from "express";
import userRepository from "../repositories/user.repository";

export default class AuthController {
  async login (req:Request, res:Response) {
    try {
      const data = req.body;
      if (!data) {
        return res.status(400).send({
          message: "login failed",
        });
      }      
      const checkEmptyUser = await userRepository.retrieveById(data.email);
      
      if (checkEmptyUser) {
        await userRepository.update(data);
      } else {
        await userRepository.save(data);
      }


      res.status(201).send({
        message: 'Success'
      });

    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Internal Server Error"
      });
    }
  };
}