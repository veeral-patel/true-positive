import { List } from "antd";
import "presentational/shared/indicators/ListItem.css";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";

interface ListItemProps {
  numberOfComments: number;
  openIndicatorDrawer: (indicatorId: number) => void;
  indicator: IIndicator;
}

const ListItemP: React.FC<ListItemProps> = ({
  numberOfComments,
  openIndicatorDrawer,
  indicator
}) => (
  <List.Item
    className="indicator_list_item"
    onClick={() => openIndicatorDrawer(indicator.id)}
  >
    {indicator.name}
  </List.Item>
);

export default ListItemP;
