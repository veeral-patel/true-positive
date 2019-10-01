import { Select } from "antd";
import React from "react";

interface Props {
  userOptions: React.ReactNode[];
}

class AddMembersForm extends React.Component<Props> {
  render() {
    const { userOptions } = this.props;
    return (
      <Select
        style={{ width: "100%" }}
        mode="multiple"
        placeholder="Add members"
      >
        {userOptions}
      </Select>
    );
  }
}

export default AddMembersForm;
