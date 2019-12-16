import { Select, Spin } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import StatusStore from "stores/StatusStore";

const { Option } = Select;

interface Props {
  value?: string;
  onChange?: (statusName: any) => void;
  statusStore?: StatusStore;
}

export default inject("statusStore")(
  observer(
    class StatusSelect extends React.Component<Props> {
      componentDidMount() {
        const { statusStore } = this.props;
        statusStore!.loadStatuses();
      }

      render() {
        const { onChange, statusStore, value } = this.props;

        if (statusStore!.statusesAreLoading) return <Spin />;

        // generate a list of options
        const options = statusStore!.statuses.map(status => (
          <Option key={status.name} value={status.name}>
            {status.name}
          </Option>
        ));

        // render our component
        return (
          <Select
            showSearch
            placeholder="Choose a status"
            style={{ minWidth: "200px" }}
            onSelect={statusName => onChange && onChange(statusName)}
            value={value}
          >
            {options}
          </Select>
        );
      }
    }
  )
);
