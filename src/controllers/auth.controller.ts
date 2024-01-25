import { Request, Response } from "express";
import userRepository from "../repositories/user.repository";

export default class AuthController {
  async login (req, res:Response) {
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
      req.session.role = checkEmptyUser?.role;
      
      res.status(200).send({
        message: 'Success',
        role: checkEmptyUser?.role
      });

    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: "Internal Server Error"
      });
    }
  };

  async updatePoint (req:Request, res:Response) {
    try {
      const data = req.body;
      if (!data) {
        return res.status(400).send({
          message: "login failed",
        });
      } 

      const checkEmptyUser = await userRepository.retrieveById(data.email);

      if (checkEmptyUser) {
        if (checkEmptyUser.point < data.point) {
          await userRepository.updatePoint(data);
        }
      } else {
        res.status(201).send({
          status: false,
          message: 'Have error !'
        });
      }
      res.status(200).send({
        status: true,
        message: 'You have completed the lesson !'
      });
    } catch (e) {
      console.log(e);
      
    }
  }

  async getUser (req:Request, res:Response) {
    try {
      const email = req.params.email;
      const user = await userRepository.retrieveById(email);
      if (user) {
        res.status(200).send({
          status: true,
          message: 'success',
          user
        });
      }
    } catch (e) {
      console.log(e);
      
    }
  }

  async getUsers (req:Request, res:Response) {
    try {
      const users = await userRepository.getAllUsers();
      if (users) {
        res.status(200).send({
          status: true,
          message: 'success',
          users
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
}