import IUser from "ts/interfaces/IUser";

interface IGroup {
  id: number;
  name: string;
  users: IUser[];
  userCount: number;
}

export default IGroup;
