import IComment from "ts/interfaces/IComment";
import IPriority from "ts/interfaces/IPriority";
import IStatus from "ts/interfaces/IStatus";
import ITag from "ts/interfaces/ITag";
import IUser from "ts/interfaces/IUser";
import ICase from "./ICase";
import IIndicator from "./IIndicator";

interface ITask {
  id: number;
  name: string;
  createdAt: string;
  tags: ITag[];
  status: IStatus;
  priority: IPriority;
  createdBy: IUser;
  assignedTo: IUser | null;
  description: string;
  comments: IComment[];
  indicators: IIndicator[];
  case: ICase;
}

export default ITask;
