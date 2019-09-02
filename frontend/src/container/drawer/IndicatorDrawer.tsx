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
        const drawerIsOpen = uiStore!.indicatorDrawer.status === "OPEN";

        if (drawerIsOpen) {
          const taskId = uiStore!.indicatorDrawer.taskId;
          const indicatorId = uiStore!.indicatorDrawer.indicatorId;

          if (!taskId || !indicatorId) {
            notification.error({
              message: "Cannot fetch indicator",
              description: "Either the task ID or the indicator ID is null"
            });

            return null;
          }

          const activeIndicator = activeCaseStore!.getIndicator(
            taskId,
            indicatorId
          );

          if (!activeIndicator) {
            notification.error({
              message: "Cannot fetch indicator",
              description: "Ensure the indicator exists"
            });

            return null;
          }

          return (
            <Drawer visible={true}>
              <h2>{activeIndicator.name}</h2>
            </Drawer>
          );
        }
        return null;
      }
    }
  )
);
