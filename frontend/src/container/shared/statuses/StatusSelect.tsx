import { Select, Spin } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import StatusStore from "stores/StatusStore";

const { Option } = Select;

interface Props {
  handleSelect: (statusId: any) => void;
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
        const { handleSelect, statusStore } = this.props;

        // handle loading and error statuses
        if (statusStore!.statusesAreLoading) return <Spin />;

        // generate a list of options
        const options = statusStore!.statuses.map(status => (
          <Option key={status.id}>{status.name}</Option>
        ));

        // render our component
        return (
          <Select
            showSearch
            placeholder="Choose a status"
            style={{ minWidth: "200px" }}
            onSelect={statusId => handleSelect(statusId)}
          >
            {options}
          </Select>
        );
      }
    }
  )
);
