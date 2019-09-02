import IComment from "ts/interfaces/IComment";
import IUser from "ts/interfaces/IUser";
import ITag from "./ITag";

interface IIndicator {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  createdBy: IUser;
  comments: IComment[];
  tags: ITag[];
}

export default IIndicator;
