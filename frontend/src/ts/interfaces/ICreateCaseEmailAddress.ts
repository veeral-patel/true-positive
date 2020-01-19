import ICaseTemplate from "./ICaseTemplate";
import IUser from "./IUser";

interface ICreateCaseEmailAddress {
  id: number;
  email: string;
  template: ICaseTemplate;
  createdAt: string;
  createdBy: IUser;
}

export default ICreateCaseEmailAddress;
