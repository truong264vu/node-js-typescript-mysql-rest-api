import { Request, Response } from "express";
import Question from '../models/question.model';
import quesitonRepository from "../repositories/question.repository";

export default class QuestionController {
  async create(req: Request, res: Response) {
    if (!req.body.question || !req.body.correctAnswer ) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const question: Question = req.body;
      const savedQuestion = await quesitonRepository.save(question);

      res.status(201).send(savedQuestion);
    } catch (err) {
      res.status(500).send({
        message: err
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const question = await quesitonRepository.retrieveById(id);

      if (question) res.status(200).send(question);
      else
        res.status(404).send({
          message: `Cannot find question with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: err
      });
    }
  }

  async findAll(req: Request, res: Response) {

    try {
      const questions = await quesitonRepository.retrieveAll();

      res.status(200).send(questions);
    } catch (err) {
      res.status(500).send({
        message: err
      });
    }
  }
}
