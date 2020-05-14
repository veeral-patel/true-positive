import IGroup from "./IGroup";

interface ICaseGroup {
  group: IGroup;
  role: "CAN_VIEW" | "CAN_EDIT";
}

export default ICaseGroup;
