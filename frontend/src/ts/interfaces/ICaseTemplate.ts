import IUser from "ts/interfaces/IUser";
import ICaseGroup from "./ICaseGroup";
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
  defaultGroups: ICaseGroup[];
}

export default ICaseTemplate;
