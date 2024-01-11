import { Request, Response } from "express";
import commentRepository from "../repositories/comment.repository";

export default class CommentController {
  async create (req:Request, res:Response) {

    const  checkCommentHaveTime = (nameHaveTime) => {
      return !nameHaveTime.includes("ago") 
      ? nameHaveTime + `<span> ${new Date()}</span>` : nameHaveTime
    }

    try {
      const data = req.body;
      if (!data) {
        return res.status(400).send({
          message: "login failed",
        });
      }      

      // data.comments = data.comments.map( comment => {
      //   return {
      //     ...comment, 
      //     fullName :  checkCommentHaveTime(comment.fullName),
      //     replies: comment.replies.length != 0 ? comment.replies.map(rep => {
      //       return {
      //         ...rep,
      //         fullName: checkCommentHaveTime(rep.fullName)
      //       }
      //     }) : []
      //   }
      // })
      const checkEmptyCommentParrent = await commentRepository.retrieveById(data.com_id);

      if (checkEmptyCommentParrent) {
        await commentRepository.update(data);
      } else {
        await commentRepository.save(data);
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

  async get(req: Request, res: Response) {
    const com_id: string = req.params.id;

    try {
      const comment = await commentRepository.retrieveById(com_id);

      if (comment) res.status(200).send({
        status: true,
        data: comment
      });
      else
        res.status(200).send({
          status: false,
          message: `Cannot find comment with id=${com_id}.`
        });
    } catch (err) {
      res.status(200).send({
        status: false,
        message: `Error retrieving comment with id=${com_id}.`
      });
    }
  }
}