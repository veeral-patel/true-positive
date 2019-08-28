import { Select } from "antd";
import React from "react";

const { Option } = Select;

const RoleSelectP: React.FC = () => (
  <Select style={{ width: "120px" }}>
    <Option value="can_view">Can View</Option>
    <Option value="can_edit">Can Edit</Option>
  </Select>
);

export default RoleSelectP;
