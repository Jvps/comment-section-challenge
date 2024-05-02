import { IUser } from "./User";

export interface IPost {
  text: string;
  user: IUser;
  date: Date;
}