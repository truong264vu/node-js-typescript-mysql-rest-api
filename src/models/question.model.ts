import { RowDataPacket } from "mysql2";

interface Answer {
  letter: string;
  text: string;
}
interface Audio {
  id: number;
  text: string;
  userAnswer: string;
}

interface NewWord {
  id: number;
  text: string;
  dictionary: string;
  userAnswer: string;
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
  new_word: NewWord[];
  date: Date;
  title: string;
  url_video: string;
  created_at: EpochTimeStamp;
}