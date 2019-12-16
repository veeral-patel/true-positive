import IUser from "ts/interfaces/IUser";
import IPriority from "./IPriority";
import IStatus from "./IStatus";

interface ICaseTemplate {
  id: number;
  name: string;
  createdAt: string;
  createdBy: IUser;
  description: string;
  status: IStatus;
  priority: IPriority;
}

export default ICaseTemplate;
