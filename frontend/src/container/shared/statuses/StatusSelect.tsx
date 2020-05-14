import { Select, Spin } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import StatusStore from "stores/StatusStore";
import { NA } from "utils/constants";

const { Option } = Select;

interface Props {
  value?: string;
  onChange?: (statusName: any) => void;
  statusStore?: StatusStore;
  includeNone?: boolean;
}

export default inject("statusStore")(
  observer(
    class StatusSelect extends React.Component<Props> {
      componentDidMount() {
        const { statusStore } = this.props;
        statusStore!.loadStatuses();
      }

      render() {
        const {
          onChange,
          statusStore,
          value,
          includeNone = false
        } = this.props;

        if (statusStore!.statusesAreLoading) return <Spin />;

        // generate a list of options
        var options = statusStore!.statuses.map(status => (
          <Option key={status.name} value={status.name}>
            {status.name}
          </Option>
        ));

        // include N/A option if our props dictate
        if (includeNone) {
          options = options.concat(
            <Option key={NA} value={NA}>
              N/A
            </Option>
          );
        }

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
