import IUser from "ts/interfaces/IUser";
import ICaseGroup from "./ICaseGroup";
import ICaseMember from "./ICaseMember";
import IPriority from "./IPriority";
import IStatus from "./IStatus";
import ITag from "./ITag";
import ITaskGroup from "./ITaskGroup";

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
  defaultMembers: ICaseMember[];
  defaultGroups: ICaseGroup[];
  defaultMemberCount: number;
  defaultGroupCount: number;
  taskGroups: ITaskGroup[];
}

export default ICaseTemplate;
