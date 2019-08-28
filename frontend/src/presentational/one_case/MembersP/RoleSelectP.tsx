import { Select } from "antd";
import React from "react";

const { Option } = Select;

interface RoleSelectProps {
  role: "CAN_VIEW" | "CAN_EDIT";
}

const RoleSelectP: React.FC<RoleSelectProps> = ({ role }) => (
  <Select<"CAN_VIEW" | "CAN_EDIT"> value={role} style={{ width: "120px" }}>
    <Option value="CAN_VIEW">Can View</Option>
    <Option value="CAN_EDIT">Can Edit</Option>
  </Select>
);

export default RoleSelectP;
