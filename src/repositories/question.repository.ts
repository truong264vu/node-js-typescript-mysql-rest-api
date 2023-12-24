import { OkPacket } from "mysql2"
import connection from "../db"

import Question from "../models/question.model"

interface IQuestionRepository {
  save(question: Question): Promise<Question>;
  // retrieveAll(searchParams: {question: string}): Promise<Question[]>;
  retrieveById(questionId: number): Promise<Question | undefined>;
  // update(question: Question): Promise<number>;
  // delete(QuestionId: number): Promise<number>;
  // deleteAll(): Promise<number>;
}

class QuestionRepository  implements IQuestionRepository {
  save(question: Question): Promise<Question> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
      "INSERT INTO questions (question, answers, correctAnswer, userAnswer) VALUES(?,?,?,?)",
      [question.question, JSON.stringify(question.answers), question.correctAnswer, question.userAnswer],
      (err, res) => {
        if (err) reject(err);
        else
          this.retrieveById(res.insertId)
            .then((question) => resolve(question!))
            .catch(reject);
      }
      );
    });
  }

  retrieveById(questionId: number): Promise<Question> {
    return new Promise((resolve, reject) => {
      connection.query<Question[]>(
        "SELECT * FROM questions WHERE id = ?",
        [questionId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  retrieveAll(): Promise<Question[]> {
    let query: string = "SELECT * FROM questions";
    let condition: string = "";

    if (condition.length)
      query += " WHERE " + condition;

    return new Promise((resolve, reject) => {
      connection.query<Question[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
}

export  default new QuestionRepository();