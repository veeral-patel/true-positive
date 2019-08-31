import IUser from "ts/interfaces/IUser";

interface ICaseMember {
  id: number;
  role: "CAN_VIEW" | "CAN_EDIT";
  user: IUser;
}

export default ICaseMember;
