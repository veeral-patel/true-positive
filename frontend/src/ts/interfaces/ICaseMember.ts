import IUser from "ts/interfaces/IUser";

interface ICaseMember {
  id: number;
  role: "CAN_VIEW" | "CAN_EDIT" | "OWNER";
  user: IUser;
}

export default ICaseMember;
