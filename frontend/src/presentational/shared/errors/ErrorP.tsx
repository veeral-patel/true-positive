import { Layout, Result } from "antd";
import React from "react";

const { Content } = Layout;

interface ErrorProps {
  title: string;
  subtitle: string;
}

const ErrorP: React.FC<ErrorProps> = ({ title, subtitle }) => (
  <Content
    style={{
      backgroundColor: "#fff",
      padding: 24,
      marginLeft: 24,
      height: "100%"
    }}
  >
    <Result status="error" title={title} subTitle={subtitle} />
    );
  </Content>
);

export default ErrorP;
