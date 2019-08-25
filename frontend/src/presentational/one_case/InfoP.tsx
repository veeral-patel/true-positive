import { Divider, Layout } from "antd";
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
      <Divider orientation="left">Details</Divider>
      <section style={{ lineHeight: 3.0 }}>
        <div>
          Status: <StatusTagP statusName={activeCase.status.name} />
        </div>
        <div>
          Priority: <PriorityTagP priorityName={activeCase.priority.name} />
        </div>
        <div>
          Created:{" "}
          {`${activeCase.formattedCreatedAt} by ${
            activeCase.createdBy.username
          }`}
        </div>
      </section>
    </Content>
  </div>
);

export default Info;
