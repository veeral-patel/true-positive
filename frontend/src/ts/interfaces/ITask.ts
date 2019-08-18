import IUser from "ts/interfaces/IUser";
import IPriority from "./IPriority";
import IStatus from "./IStatus";

interface ITask {
  id: number;
  name: string;
  status: IStatus;
  priority: IPriority;
  createdBy: IUser;
  assignedTo: IUser | null;
}

export default ITask;
