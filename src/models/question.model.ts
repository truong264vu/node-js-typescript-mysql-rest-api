import { RowDataPacket } from "mysql2";

interface Answer {
  letter: string;
  text: string;
}
interface Audio {
  id: number;
  text: string;
}
interface Questions {
  id: number;
  question: string;
  answers: Answer[];
  correctAnswer: string;
  userAnswer: string | null;
  date: Date;
}

export default interface Question extends RowDataPacket {
  id: number;
  questions: Questions[];
  audio: Audio[];
  date: Date;
  url_video: string;
  created_at: EpochTimeStamp;
}