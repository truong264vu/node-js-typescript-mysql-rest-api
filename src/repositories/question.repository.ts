import { OkPacket } from "mysql2"
import connection from "../db"
import { format } from 'date-fns';

import Question from "../models/question.model"

interface IQuestionRepository {
  save(questions: Question): Promise<Question>;
  // retrieveAll(searchParams: {question: string}): Promise<Question[]>;
  retrieveById(questionId: number): Promise<Question | undefined>;
  update(question: Question): Promise<number>;
  // delete(QuestionId: number): Promise<number>;
  // deleteAll(): Promise<number>;
}

class QuestionRepository  implements IQuestionRepository {
  save(questions: Question): Promise<Question> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
      "INSERT INTO questions (questions, audio, date ,created_at, url_video, title) VALUES(?,?,?,?,?,?)",
      [JSON.stringify(questions.questions), JSON.stringify(questions.audio), format(questions.date, 'yyyy-MM-dd'), new Date(), questions.url_video, questions.title],
      (err, res) => {
        if (err) reject(err);
        else
          this.retrieveById(res.insertId)
            .then((questions) => resolve(questions!))
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
    let query: string = "SELECT id, title FROM questions";
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

  update(question: Question): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "UPDATE questions SET questions = ?, audio = ?, date = ?, url_video = ?, title = ? WHERE id = ?",
        [JSON.stringify(question.questions), JSON.stringify(question.audio), format(question.date, 'yyyy-MM-dd'), question.url_video, question.title, question.id],
        (err, res) => {
          console.log(err);
          if (err) reject(err);
          else resolve(res.affectedRows); 
        }
      );
    });
  }
}

export  default new QuestionRepository();