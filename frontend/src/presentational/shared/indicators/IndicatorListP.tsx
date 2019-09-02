import { List } from "antd";
import ListItemP from "presentational/shared/indicators/ListItemP";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";

interface IndicatorListProps {
  indicators: IIndicator[];
  openIndicatorDrawer: (indicatorId: number) => void;
}

const IndicatorListP: React.FC<IndicatorListProps> = ({
  indicators,
  openIndicatorDrawer
}) => (
  <List
    itemLayout="horizontal"
    dataSource={indicators}
    bordered
    renderItem={indicator => (
      <ListItemP
        indicator={indicator}
        numberOfComments={indicator.comments.length}
        openIndicatorDrawer={openIndicatorDrawer}
      />
    )}
  />
);

export default IndicatorListP;
