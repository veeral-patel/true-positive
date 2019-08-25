import IPriority from "ts/interfaces/IPriority";
import IStatus from "ts/interfaces/IStatus";
import ITask from "ts/interfaces/ITask";
import IUser from "ts/interfaces/IUser";
import IComment from "./IComment";

interface ICase {
  id: number;
  name: string;
  createdAt: string;
  formattedCreatedAt: string;
  description: string;
  status: IStatus;
  priority: IPriority;
  createdBy: IUser;
  assignedTo: IUser | null;
  tasks: ITask[];
  tags: string[];
  comments: IComment[];
}

export default ICase;
