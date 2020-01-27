import IGroup from "./IGroup";

interface ICaseGroup {
  id: number;
  group: IGroup;
  role: "CAN_VIEW" | "CAN_EDIT";
}

export default ICaseGroup;
