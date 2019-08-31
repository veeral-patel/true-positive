import IComment from "ts/interfaces/IComment";
import IUser from "ts/interfaces/IUser";

interface IIndicator {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  createdBy: IUser;
  comments: IComment[];
}

export default IIndicator;
