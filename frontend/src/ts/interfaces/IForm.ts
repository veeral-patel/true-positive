import IUser from "ts/interfaces/IUser";

interface IForm {
  id: number;
  name: string;
  createdAt: string;
  createdBy: IUser;
}

export default IForm;
