import { navigate } from "@reach/router";
import { Icon, List, Tooltip, Typography } from "antd";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";
import { getPathToAnIndicator } from "utils/pathHelpers";
import truncateString from "utils/truncateString";

const { Text } = Typography;

interface Props {
  indicators: IIndicator[];
}

class IndicatorList extends React.Component<Props> {
  render() {
    const { indicators } = this.props;
    return (
      <List
        bordered
        dataSource={indicators}
        renderItem={indicator => (
          <List.Item
            style={{ cursor: "pointer" }}
            className="hoverable_item"
            onClick={() =>
              navigate(getPathToAnIndicator(indicator.case.id, indicator.id))
            }
          >
            <List.Item.Meta
              title={
                <Text copyable={{ text: indicator.name }}>
                  {truncateString(indicator.name, 50)}
                </Text>
              }
              description={
                <div style={{ marginTop: "0.75em" }}>
                  <ListOfTagsP tags={indicator.tags} limit={5} />
                </div>
              }
            />
            <Tooltip title={`${indicator.comments.length} comments`}>
              <Icon type="message" /> {indicator.comments.length}
            </Tooltip>
          </List.Item>
        )}
      />
    );
  }
}

export default IndicatorList;
