import { Select, Spin } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import PriorityStore from "stores/PriorityStore";

const { Option } = Select;

interface PrioritySelectProps {
  priorityStore?: PriorityStore;
}

export default inject("priorityStore")(
  observer(
    class PrioritySelect extends React.Component<PrioritySelectProps> {
      componentDidMount() {
        const { priorityStore } = this.props;
        priorityStore!.loadPriorities();
      }

      render() {
        const { priorityStore } = this.props;

        if (priorityStore!.prioritiesAreLoading) return <Spin />;

        const options = priorityStore!.priorities.map(priority => (
          <Option key={priority.id}>{priority.name}</Option>
        ));

        return (
          <Select
            showSearch
            placeholder="Choose a priority"
            style={{ minWidth: "200px" }}
          >
            {options}
          </Select>
        );
      }
    }
  )
);
