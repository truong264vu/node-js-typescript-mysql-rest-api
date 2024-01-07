import { RowDataPacket } from "mysql2"

export default interface User extends RowDataPacket {
  id?: number;
  name?: string;
  email?: string;
  image?: string;
  jti?: string;
  point?: number;
  created_at: EpochTimeStamp;
}
