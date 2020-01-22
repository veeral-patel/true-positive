import { ArrowRightOutlined, PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React from "react";

interface Props {
  /* the callback that's run when you hit enter after inputting your indicator. */
  handleEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;

  /* the placeholder for this input */
  placeholder?: string;
}

function CreateTaskInput({
  handleEnter,
  placeholder = "Create a task"
}: Props) {
  return (
    <Input
      placeholder={placeholder}
      prefix={<PlusOutlined />}
      suffix={<ArrowRightOutlined />}
      onPressEnter={handleEnter}
    />
  );
}

export default CreateTaskInput;
