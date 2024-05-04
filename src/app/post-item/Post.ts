import { IUser } from "./User";

export interface IPost {
  id: number;
  text: string;
  user: IUser;
  date: Date;
  postReplies?: IPost[];
}