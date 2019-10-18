import { Icon, List, Typography } from "antd";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";
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
          <List.Item style={{ cursor: "pointer" }} className="hoverable_item">
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
            <div>
              <Icon type="message" /> {indicator.comments.length}
            </div>
          </List.Item>
        )}
      />
    );
  }
}

export default IndicatorList;
