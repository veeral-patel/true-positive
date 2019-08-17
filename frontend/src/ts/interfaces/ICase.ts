import IStatus from "ts/interfaces/IStatus";
import IPriority from "ts/interfaces/IPriority";
import IUser from "ts/interfaces/IUser";

interface ICase {
  id: number;
  name: string;
  description: string;
  status: IStatus;
  priority: IPriority;
  createdBy: IUser;
  assignedTo: IUser | null;
}

export default ICase;
