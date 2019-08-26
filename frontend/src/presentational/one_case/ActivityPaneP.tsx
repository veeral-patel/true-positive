import { Empty, Layout, Typography } from "antd";
import React from "react";

const { Content } = Layout;
const { Text } = Typography;

const ActivityPaneP: React.FC = () => (
  <Content
    style={{
      backgroundColor: "#fff",
      padding: 24,
      marginLeft: 24
    }}
  >
    <Text type="secondary" style={{ textTransform: "uppercase" }}>
      Activity
    </Text>
    <Empty description="No Activity" />
  </Content>
);

export default ActivityPaneP;
