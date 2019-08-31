import IUser from "ts/interfaces/IUser";

interface IComment {
  id: number;
  comment: string;
  createdBy: IUser;
  createdAt: string;
  formattedCreatedAt: string;
}

export default IComment;
