import { Icon, List } from "antd";
import "presentational/shared/indicators/ListItem.css";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";

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
    actions={[<NumberOfComments count={numberOfComments} />]}
    onClick={() => openIndicatorDrawer(indicator.id)}
  >
    <div style={{ width: "90%", overflow: "hidden", textOverflow: "ellipsis" }}>
      {indicator.name}
    </div>
  </List.Item>
);

export default ListItemP;
