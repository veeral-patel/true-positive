import { Select, Spin } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import StatusStore from "stores/StatusStore";

const { Option } = Select;

interface StatusSelectProps {
  statusStore?: StatusStore;
}

export default inject("statusStore")(
  observer(
    class StatusSelect extends React.Component<StatusSelectProps> {
      render() {
        const { statusStore } = this.props;

        if (statusStore!.statusesAreLoading) return <Spin />;

        const options = statusStore!.statuses.map(status => (
          <Option key={status.id}>{status.name}</Option>
        ));

        return (
          <Select
            showSearch
            placeholder="Choose a status"
            style={{ minWidth: "200px" }}
          >
            {options}
          </Select>
        );
      }
    }
  )
);
