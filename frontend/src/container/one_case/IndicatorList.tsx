import { List, Typography } from "antd";
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
          <List.Item>
            <Text copyable={{ text: indicator.name }}>
              {truncateString(indicator.name, 50)}
            </Text>
          </List.Item>
        )}
      />
    );
  }
}

export default IndicatorList;
