import ICase from "ts/interfaces/ICase";
import IComment from "ts/interfaces/IComment";
import ITag from "ts/interfaces/ITag";
import ITask from "ts/interfaces/ITask";
import IUser from "ts/interfaces/IUser";

interface IIndicator {
  id: number;
  case: ICase;
  name: string;
  description: string;
  createdAt: string;
  createdBy: IUser;
  comments: IComment[];
  tags: ITag[];
  task: ITask;
}

export default IIndicator;
