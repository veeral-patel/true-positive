import { Icon, Input } from "antd";
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
        prefix={<Icon type="plus" />}
        suffix={<Icon type="arrow-right" />}
        onPressEnter={handleEnter}
      />
    );
  }
}

export default CreateTaskInput;
