import IUser from "ts/interfaces/IUser";

interface ITaskTemplate {
  id: number;
  name: string;
  createdAt: string;
  createdBy: IUser;
  description: string | null;
  assignedTo: IUser | null;
}

export default ITaskTemplate;
