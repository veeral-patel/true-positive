import IUser from "ts/interfaces/IUser";
import ICaseMember from "./ICaseMember";
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
  defaultUserCount: number;
  defaultMembers: ICaseMember[];
}

export default ICaseTemplate;
