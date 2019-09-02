import IComment from "ts/interfaces/IComment";
import IUser from "ts/interfaces/IUser";
import ITag from "./ITag";
import ITask from "./ITask";

interface IIndicator {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  createdBy: IUser;
  comments: IComment[];
  tags: ITag[];
  task: ITask;
}

export default IIndicator;
