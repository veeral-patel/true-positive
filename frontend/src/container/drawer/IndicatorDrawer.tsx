import { Drawer } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import UIStore from "stores/UIStore";

interface IndicatorDrawerProps {
  uiStore?: UIStore;
}

export default inject("uiStore")(
  observer(
    class IndicatorDrawer extends React.Component<IndicatorDrawerProps> {
      render() {
        const { uiStore } = this.props;
        return <Drawer visible={uiStore!.indicatorDrawer.status === "OPEN"} />;
      }
    }
  )
);
