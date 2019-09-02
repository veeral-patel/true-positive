import { Drawer, notification } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import UIStore from "stores/UIStore";

interface IndicatorDrawerProps {
  uiStore?: UIStore;
  activeCaseStore?: ActiveCaseStore;
}

export default inject("uiStore", "activeCaseStore")(
  observer(
    class IndicatorDrawer extends React.Component<IndicatorDrawerProps> {
      render() {
        const { uiStore, activeCaseStore } = this.props;
        if (uiStore!.indicatorDrawer.status === "OPEN") {
          const taskId = uiStore!.indicatorDrawer.taskId;
          const indicatorId = uiStore!.indicatorDrawer.indicatorId;

          if (!taskId || !indicatorId) {
            notification.error({
              message: "Cannot fetch indicator",
              description: "Either the task id or the indicator id is null"
            });

            return null;
          }

          const activeIndicator = activeCaseStore!.getIndicator(
            taskId,
            indicatorId
          );

          return <Drawer visible={true} />;
        }
        return null;
      }
    }
  )
);
