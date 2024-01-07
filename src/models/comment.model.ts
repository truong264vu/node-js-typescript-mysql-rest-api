import { RowDataPacket } from "mysql2"

interface Reply {
  userId: number,
  comId: string,
  fullName: string,
  // userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
  text: string,
  avatarUrl: string,
  // replies: Array
}

interface Comments {
  userId: number,
  comId: string,
  fullName: string,
  // userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
  text: string,
  avatarUrl: string,
  replies: Reply
}

export default interface Comment extends RowDataPacket {
  id?: number;
  comments?: Comments[];
  com_id?: string;
  last_comment: EpochTimeStamp;
}
