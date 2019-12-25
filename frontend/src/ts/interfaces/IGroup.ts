import IUser from "ts/interfaces/IUser";

interface IGroup {
  name: string;
  users: IUser[];
  userCount: number;
}

export default IGroup;
