import { Icon, List, Typography } from "antd";
import "presentational/shared/indicators/ListItem.css";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";

const { Text } = Typography;

interface NumberofCommentsProps {
  count: number;
}

const NumberOfComments: React.FC<NumberofCommentsProps> = ({ count }) => (
  <span>
    <Icon type="message" />
    <span style={{ marginLeft: "5px" }}>{count}</span>
  </span>
);

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
