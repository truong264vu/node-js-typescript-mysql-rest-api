import { OkPacket } from "mysql2"
import connection from "../db"
import { format } from 'date-fns';

import User from "../models/user.model"

interface IUserRepository {
  save(users: User): Promise<User>;
  getAllUsers(searchParams: {users: string}): Promise<User[]>;
  // retrieveById(questionId: number): Promise<User | undefined>;
  // update(question: User): Promise<number>;
  // delete(QuestionId: number): Promise<number>;
  // deleteAll(): Promise<number>;
}

class UserRepository  implements IUserRepository {
  save(users: User): Promise<User> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
      "INSERT INTO users (jti, name, email, image, created_at) VALUES(?,?,?,?,?)",
      [users.jti, users.name, users.email, users.picture, new Date()],
      (err, res) => {
        if (err) reject(err);
      //   else
      //     this.retrieveById(res.insertId)
      //       .then((users) => resolve(users!))
      //       .catch(reject);
      }
      );
    });
  }

  //jti : id of gmail
  retrieveById(email: string): Promise<User> {
    return new Promise((resolve, reject) => {
      connection.query<User[]>(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  // retrieveAll(): Promise<Question[]> {
  //   let query: string = "SELECT * FROM users";
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

  updatePoint(users: User): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "UPDATE users SET point = ? WHERE email = ?",
        [users.point, users.email],
        (err, res) => {
          console.log(err);
          if (err) reject(err);
          else resolve(res.affectedRows); 
        }
      );
    });
  }

  update(users: User): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "UPDATE users SET jti = ?, name = ?, image = ?, last_join_at = ? WHERE email = ?",
        [users.jti, users.name, users.picture, users.email, new Date()],
        (err, res) => {
          console.log(err);
          if (err) reject(err);
          else resolve(res.affectedRows); 
        }
      );
    });
  }

  getAllUsers(): Promise<User[]> {
    let query: string = "SELECT email, name, point, image, last_join_at  FROM users";
    let condition: string = "";

    if (condition.length)
      query += " WHERE " + condition;
      query += " ORDER BY point DESC";

    return new Promise((resolve, reject) => {
      connection.query<User[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
}

export  default new UserRepository();