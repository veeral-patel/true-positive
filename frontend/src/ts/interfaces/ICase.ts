import IAttachment from "ts/interfaces/IAttachment";
import IAudit from "ts/interfaces/IAudit";
import ICaseMember from "ts/interfaces/ICaseMember";
import IComment from "ts/interfaces/IComment";
import IIndicator from "ts/interfaces/IIndicator";
import IPriority from "ts/interfaces/IPriority";
import IStatus from "ts/interfaces/IStatus";
import ITag from "ts/interfaces/ITag";
import ITask from "ts/interfaces/ITask";
import ITaskGroup from "ts/interfaces/ITaskGroup";
import IUser from "ts/interfaces/IUser";
import ICaseGroup from "./ICaseGroup";

interface ICase {
  id: number;
  name: string;
  createdAt: string;
  description: string;
  status: IStatus;
  priority: IPriority;
  createdBy: IUser;
  assignedTo: IUser | null;
  tasks: ITask[];
  tags: ITag[];
  comments: IComment[];
  isMerged: boolean;
  mergedInto: ICase | null;
  mergedCases: ICase[];
  reasonForMerging: string | null;
  caseMembers: ICaseMember[];
  caseMemberCount: number;
  caseGroups: ICaseGroup[];
  caseGroupCount: number;
  indicators: IIndicator[];
  attachments: IAttachment[];
  attachmentCount: number;
  completedTaskCount: number;
  totalTaskCount: number;
  taskGroups: ITaskGroup[];
  audits: IAudit[];
  taskGroupCount: number;
}

export default ICase;
