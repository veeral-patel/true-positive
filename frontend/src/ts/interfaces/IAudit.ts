import IUser from "ts/interfaces/IUser";

interface IAudit {
  id: number;
  createdAt: string;
  createdBy: IUser;
  parameters: Object;
  associatedId: number;
  action: string;
  readableMessage: string;
}

export default IAudit;
