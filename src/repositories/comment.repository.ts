import { OkPacket } from "mysql2"
import connection from "../db"
import { format } from 'date-fns';

import Comment from "../models/comment.model"

interface ICommentRepository {
  save(comments: Comment): Promise<Comment>;
  // retrieveAll(searchParams: {question: string}): Promise<Question[]>;
  retrieveById(com_id: string): Promise<Comment | undefined>;
  update(comments: Comment): Promise<number>;
  // delete(QuestionId: number): Promise<number>;
  // deleteAll(): Promise<number>;
}

class CommentRepository  implements ICommentRepository {
  save(comments: Comment): Promise<Comment> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
      "INSERT INTO comments (comments, com_id, last_comment) VALUES(?,?,?)",
      [JSON.stringify(comments.comments), comments.com_id, new Date()],
      (err, res) => {
        if (err) reject(err);
      //   else
      //     this.retrieveById(res.insertId)
      //       .then((comments) => resolve(comments!))
      //       .catch(reject);
      }
      );
    });
  }

  //jti : id of gmail
  retrieveById(com_id: string): Promise<Comment> {
    return new Promise((resolve, reject) => {
      connection.query<Comment[]>(
        "SELECT * FROM comments WHERE com_id = ?",
        [com_id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  // retrieveAll(): Promise<Question[]> {
  //   let query: string = "SELECT * FROM comments";
  //   let condition: string = "";

  //   if (condition.length)
  //     query += " WHERE " + condition;

  //   return new Promise((resolve, reject) => {
  //     connection.query<Question[]>(query, (err, res) => {
  //       if (err) reject(err);
  //       else resolve(res);
  //     });
  //   });
  // }

  update(comments: Comment): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "UPDATE comments SET comments = ?, last_comment = ? Where com_id = ?",
        [JSON.stringify(comments.comments), new Date(), comments.com_id],
        (err, res) => {
          console.log(err);
          if (err) reject(err);
          else resolve(res.affectedRows); 
        }
      );
    });
  }
}

export  default new CommentRepository();