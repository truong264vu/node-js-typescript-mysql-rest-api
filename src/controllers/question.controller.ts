import { Request, Response } from "express";
import Question from '../models/question.model';
import questionRepository from "../repositories/question.repository";

export default class QuestionController {
  async create(req: Request, res: Response) {
    try {
      const newQuestions = req.body;
      if (!newQuestions.audio) {
        return res.status(400).send({
          message: "audio cannot be empty!"
        });
      }

      for (const question of newQuestions.questions) {
        if (!question.question) {
          return res.status(400).send({
            message: "Question and Correct Answer cannot be empty!"
          });
        }

        if (!question.correctAnswer) {
          return res.status(400).send({
            message: "Correct Answer cannot be empty!"
          });
        }

        for (const answer of question.answers) {
          if (!answer.letter || !answer.text) {
            return res.status(400).send({
              message: "Answer letter and text cannot be empty!"
            });
          }
        }

      }
      await questionRepository.save(newQuestions);

      res.status(201).send({
        message: 'Success'
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "Internal Server Error"
      });
    }
  }


  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const question = await questionRepository.retrieveById(id);

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
      const questions = await questionRepository.retrieveAll();

      res.status(200).send(questions);
    } catch (err) {
      res.status(500).send({
        message: err
      });
    }
  }

  async update(req: Request, res: Response) {
    let questionU = req.body;
    questionU.id = parseInt(req.params.id);

    try {
      for (const question of questionU.questions) {
        if (!question.correctAnswer) {
          return res.status(400).send({
            message: "Correct Answer cannot be empty!"
          });
        }
        for (const answer of question.answers) {
          if (!answer.letter || !answer.text) {
            return res.status(400).send({
              message: "Answer letter and text cannot be empty!"
            });
          }
        }
        if (!question.question) {
          return res.status(400).send({
            message: "Question and Correct Answer cannot be empty!"
          });
        }
      }

        if (!questionU.audio) {
          return res.status(400).send({
            message: "audio cannot be empty!"
          });
        }

        if (!questionU.url_video) {
          return res.status(400).send({
            message: "url video cannot be empty!"
          });
        }
        const num = await questionRepository.update(questionU);

        if (num == 1) {
          res.send({
            message: "Question was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Question with id=${questionU.id}`
          });
        }
      } catch (err) {
        res.status(500).send({
          message: `Error updating Question with id=${questionU.id}.`
        });
      }
    }
  }