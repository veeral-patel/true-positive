import IUser from "ts/interfaces/IUser";
import IPriority from "./IPriority";
import IStatus from "./IStatus";
import ITag from "./ITag";

interface ICaseTemplate {
  id: number;
  name: string;
  createdAt: string;
  createdBy: IUser;
  status: IStatus;
  priority: IPriority;
  tags: ITag[];
  description: string | null;
  assignedTo: IUser | null;
}

export default ICaseTemplate;
