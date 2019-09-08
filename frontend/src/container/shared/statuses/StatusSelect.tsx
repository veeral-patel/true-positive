import { Select } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import StatusStore from "stores/StatusStore";

interface StatusSelectProps {
  statusStore?: StatusStore;
}

export default inject("statusStore")(
  observer(
    class StatusSelect extends React.Component<StatusSelectProps> {
      render() {
        return <Select showSearch placeholder="Choose a status" />;
      }
    }
  )
);
