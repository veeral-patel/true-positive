import IStatus from "./IStatus";
import IPriority from "./IPriority";
import IUser from "./IUser";

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
