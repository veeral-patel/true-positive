import { Layout } from "antd";
import React from "react";
import OneCaseBreadcrumb from "./OneCaseBreadcrumb";

const { Content } = Layout;

interface MembersProps {
  caseName: string;
}

const Members: React.FC<MembersProps> = ({ caseName }) => (
  <div>
    <OneCaseBreadcrumb caseName={caseName} tabName="Members" />
    <Content
      style={{
        background: "#fff",
        padding: 24,
        margin: 0,
        minHeight: 280
      }}
    >
      <h2>Members</h2>
    </Content>
  </div>
);

export default Members;
