import { Layout } from "antd";
import OneCaseBreadcrumb from "presentational/one_case/OneCaseBreadcrumb";
import PriorityTagP from "presentational/shared/tags/PriorityTagP";
import StatusTagP from "presentational/shared/tags/StatusTagP";
import React from "react";
import ICase from "ts/interfaces/ICase";

const { Content } = Layout;

interface InfoProps {
  activeCase: ICase;
}

const Info: React.FC<InfoProps> = ({ activeCase }) => (
  <div>
    <OneCaseBreadcrumb caseName={activeCase.name} tabName="Info" />
    <Content
      style={{
        background: "#fff",
        padding: 24,
        margin: 0,
        minHeight: 280
      }}
    >
      <h2>Info</h2>
      <h4>Details</h4>
      <section style={{ lineHeight: 3.0 }}>
        Status: <StatusTagP statusName={activeCase.status.name} />
        <br />
        Priority: <PriorityTagP priorityName={activeCase.priority.name} />
        <br />
        Created:{" "}
        {`${activeCase.formattedCreatedAt} by ${activeCase.createdBy.username}`}
      </section>
    </Content>
  </div>
);

export default Info;
