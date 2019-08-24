import { Layout } from "antd";
import OneCaseBreadcrumb from "presentational/one_case/OneCaseBreadcrumb";
import React from "react";

const { Content } = Layout;

interface InfoProps {
  caseName: string;
}

const Info: React.FC<InfoProps> = ({ caseName }) => (
  <div>
    <OneCaseBreadcrumb caseName={caseName} tabName="Info" />
    <Content
      style={{
        background: "#fff",
        padding: 24,
        margin: 0,
        minHeight: 280
      }}
    >
      <h2>Info</h2>
    </Content>
  </div>
);

export default Info;
