import IComment from "ts/interfaces/IComment";
import ITag from "ts/interfaces/ITag";
import IUser from "ts/interfaces/IUser";
import ICase from "./ICase";
import IIndicator from "./IIndicator";

interface ITask {
  id: number;
  name: string;
  createdAt: string;
  tags: ITag[];
  createdBy: IUser;
  assignedTo: IUser | null;
  description: string;
  comments: IComment[];
  indicators: IIndicator[];
  case: ICase;
}

export default ITask;
