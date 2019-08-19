import { RouteComponentProps } from "@reach/router";
import { Button, Icon, Input, PageHeader } from "antd";
import CasesTable from "container/cases/CasesTable";
import React from "react";

const AllCasesPage: React.FC<RouteComponentProps> = () => (
  <div>
    <PageHeader
      title={<h2>Cases</h2>}
      backIcon={false}
      style={{ paddingLeft: 0 }}
      extra={[<Button type="primary">Create Case</Button>]}
    />
    <div style={{ marginBottom: "30px", width: "40%" }}>
      <Input placeholder="Filter cases" prefix={<Icon type="search" />} />
    </div>
    <CasesTable />
  </div>
);

export default AllCasesPage;
