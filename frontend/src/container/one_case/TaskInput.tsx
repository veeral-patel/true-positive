import { Icon, Input } from "antd";
import React from "react";

class CreateTaskInput extends React.Component {
  render() {
    return (
      <Input
        placeholder="Create a task"
        prefix={<Icon type="plus" />}
        suffix={<Icon type="arrow-right" />}
        style={{ marginBottom: "2em" }}
      />
    );
  }
}

export default CreateTaskInput;
