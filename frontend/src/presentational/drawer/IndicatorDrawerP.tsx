import { Drawer } from "antd";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";

interface IndicatorDrawerProps {
  activeIndicator: IIndicator;
  visible: boolean;
  handleClose: () => void;
}

const IndicatorDrawerP: React.FC<IndicatorDrawerProps> = ({
  activeIndicator,
  visible,
  handleClose
}) => (
  <Drawer visible={visible} onClose={handleClose}>
    <h4>{activeIndicator.name}</h4>
  </Drawer>
);

export default IndicatorDrawerP;
