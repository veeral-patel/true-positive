import { Select } from "antd";
import React from "react";

interface Props {
  placeholder: string;
}

function TaskTemplateSelect({ placeholder }: Props) {
  return (
    <Select
      placeholder={placeholder}
      mode="multiple"
      options={[]}
      style={{ width: "100%" }}
    />
  );
}

export default TaskTemplateSelect;
