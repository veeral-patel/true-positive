import ICase from "ts/interfaces/ICase";
import IComment from "ts/interfaces/IComment";
import ITag from "ts/interfaces/ITag";
import ITask from "ts/interfaces/ITask";
import IUser from "ts/interfaces/IUser";
import IAttachment from "./IAttachment";

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
  type: "STRING" | "TEXT" | "FILE";
  indicator: string /* the indicator itself */;
  attachments: IAttachment[];
}

export default IIndicator;
