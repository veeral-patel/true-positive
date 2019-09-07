import { Input } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import StatusStore from "stores/StatusStore";

interface ListAndFilterStatusesProps {
  statusStore?: StatusStore;
}

export default inject("statusStore")(
  observer(
    class ListAndFilterStatuses extends React.Component<
      ListAndFilterStatusesProps
    > {
      render() {
        return (
          <div>
            <Input placeholder="Filter statuses" />
          </div>
        );
      }
    }
  )
);
