import { List, Typography } from "antd";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";

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
            <Text copyable style={{ overflowX: "hidden", maxWidth: "90%" }}>
              {indicator.name}
            </Text>
          </List.Item>
        )}
      />
    );
  }
}

export default IndicatorList;
