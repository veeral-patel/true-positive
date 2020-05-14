import ICaseTemplate from "./ICaseTemplate";
import IUser from "./IUser";

interface ICreateCaseEmailAddress {
  id: number;
  email: string;
  caseTemplate: ICaseTemplate;
  createdAt: string;
  createdBy: IUser;
  defaultCreator: IUser;
}

export default ICreateCaseEmailAddress;
