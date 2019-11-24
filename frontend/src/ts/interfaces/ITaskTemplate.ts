import IUser from "./IUser";

interface ITaskTemplate {
  id: number;
  name: string;
  createdAt: string;
  createdBy: IUser;
  assignedTo: IUser | null;
  description: string;
}

export default ITaskTemplate;
