import { List, Spin } from "antd";
import StatusItem from "container/admin/StatusItem";
import { inject, observer } from "mobx-react";
import React from "react";
import StatusStore from "stores/StatusStore";
import IStatus from "ts/interfaces/IStatus";

interface IListofStatusProps {
  statusStore?: StatusStore;
}

export default inject("statusStore")(
  observer(
    class ListofStatuses extends React.Component<IListofStatusProps> {
      componentDidMount() {
        const { statusStore } = this.props;
        statusStore!.loadStatuses();
      }

      render() {
        const { statusStore } = this.props;
        const isLoading = statusStore!.statusesAreLoading;

        if (isLoading) {
          return <Spin />;
        }

        const statuses = statusStore!.statuses;

        return (
          <List<IStatus>
            itemLayout="horizontal"
            dataSource={statuses}
            renderItem={status => <StatusItem status={status} />}
          />
        );
      }
    }
  )
);
