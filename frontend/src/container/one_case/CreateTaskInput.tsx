import { ArrowRightOutlined, PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React from "react";

interface Props {
  /* the callback that's run when you hit enter after inputting your indicator. */
  handleEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

class CreateTaskInput extends React.Component<Props> {
  render() {
    const { handleEnter } = this.props;
    return (
      <Input
        placeholder="Create a task"
        prefix={<PlusOutlined />}
        suffix={<ArrowRightOutlined />}
        onPressEnter={handleEnter}
      />
    );
  }
}

export default CreateTaskInput;
