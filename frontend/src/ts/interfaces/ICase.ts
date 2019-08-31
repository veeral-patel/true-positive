import ICaseMember from "ts/interfaces/ICaseMember";
import IComment from "ts/interfaces/IComment";
import IPriority from "ts/interfaces/IPriority";
import IStatus from "ts/interfaces/IStatus";
import ITask from "ts/interfaces/ITask";
import IUser from "ts/interfaces/IUser";

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
  isMerged: boolean;
  mergedInto: ICase | null;
  mergedAt: string;
  mergedCases: ICase[];
  caseMembers: ICaseMember[];
}

export default ICase;
