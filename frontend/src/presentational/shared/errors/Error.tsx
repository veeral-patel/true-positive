import { Layout, Result } from "antd";
import React from "react";

const { Content } = Layout;

interface Props {
  title: string;
  subtitle: string;
}

function Error({ title, subtitle }: Props) {
  return (
    <Content
      style={{
        backgroundColor: "#fff",
        padding: 24,
        height: "100%"
      }}
    >
      <Result status="error" title={title} subTitle={subtitle} />
    </Content>
  );
}

export default Error;
