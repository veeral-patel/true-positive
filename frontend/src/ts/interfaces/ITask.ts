import IComment from "ts/interfaces/IComment";
import IUser from "ts/interfaces/IUser";
import IAttachment from "./IAttachment";
import ICase from "./ICase";
import IIndicator from "./IIndicator";

interface ITask {
  id: number;
  name: string;
  createdAt: string;
  createdBy: IUser;
  assignedTo: IUser | null;
  description: string;
  comments: IComment[];
  indicators: IIndicator[];
  case: ICase;
  done: boolean;
  commentCount: number;
  attachments: IAttachment[];
  attachmentCount: number;
}

export default ITask;
