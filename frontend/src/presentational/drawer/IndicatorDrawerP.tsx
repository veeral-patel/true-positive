import { Drawer } from "antd";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";

interface IndicatorDrawerProps {
  activeIndicator: IIndicator;
  visible: boolean;
}

const IndicatorDrawerP: React.FC<IndicatorDrawerProps> = ({
  activeIndicator,
  visible
}) => (
  <Drawer visible={visible}>
    <h4>{activeIndicator.name}</h4>
  </Drawer>
);

export default IndicatorDrawerP;
