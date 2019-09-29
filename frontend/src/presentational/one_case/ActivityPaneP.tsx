import { Empty, Layout, Typography } from "antd";
import React from "react";

const { Content } = Layout;
const { Text } = Typography;

const ActivityPaneP: React.FC = () => (
  <Content
    style={{
      backgroundColor: "#fff",
      padding: 24,
      marginLeft: 24,
      height: "100%"
    }}
  >
    <Text type="secondary" style={{ textTransform: "uppercase" }}>
      Activity
    </Text>
    <Empty
      description={
        <div>
          <p>No Activity</p>
          <p style={{ color: "#bfbfbf" }}>
            Soon, you'll be able to follow case changes in real-time here.
          </p>
        </div>
      }
    />
  </Content>
);

export default ActivityPaneP;
