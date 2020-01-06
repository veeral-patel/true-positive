import { Select, Spin } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import PriorityStore from "stores/PriorityStore";
import { NA } from "utils/constants";

const { Option } = Select;

interface Props {
  value?: string;
  onChange?: (priorityName: any) => void;
  priorityStore?: PriorityStore;
  includeNone?: boolean;
}

export default inject("priorityStore")(
  observer(
    class PrioritySelect extends React.Component<Props> {
      componentDidMount() {
        const { priorityStore } = this.props;
        priorityStore!.loadPriorities();
      }

      render() {
        const {
          onChange,
          priorityStore,
          value,
          includeNone = false
        } = this.props;

        if (priorityStore!.prioritiesAreLoading) return <Spin />;

        // generate a list of options
        var options = priorityStore!.priorities.map(priority => (
          <Option key={priority.name} value={priority.name}>
            {priority.name}
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
            placeholder="Choose a priority"
            style={{ minWidth: "200px" }}
            onSelect={priorityName => onChange && onChange(priorityName)}
            value={value}
          >
            {options}
          </Select>
        );
      }
    }
  )
);
