import IUser from "ts/interfaces/IUser";

interface ICaseMember {
  role: "CAN_VIEW" | "CAN_EDIT";
  user: IUser;
}

export default ICaseMember;
