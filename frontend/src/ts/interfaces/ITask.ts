import IUser from "ts/interfaces/IUser";
import IComment from "./IComment";
import IPriority from "./IPriority";
import IStatus from "./IStatus";

interface ITask {
  id: number;
  name: string;
  createdAt: string;
  tags: string[];
  status: IStatus;
  priority: IPriority;
  createdBy: IUser;
  assignedTo: IUser | null;
  description: string;
  comments: IComment[];
}

export default ITask;
