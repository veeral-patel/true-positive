import IUser from "./IUser";

interface IMember {
  id: number;
  role: "CAN_VIEW" | "CAN_EDIT";
  user: IUser;
}

export default IMember;
