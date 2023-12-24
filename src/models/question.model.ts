import { RowDataPacket } from "mysql2";

interface Answer {
  letter: string;
  text: string;
}

export default interface Question extends RowDataPacket {
  id: number;
  question: string;
  answers: Answer[];
  correctAnswer: string;
  userAnswer: string | null;
}