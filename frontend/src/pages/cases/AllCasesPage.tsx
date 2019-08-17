import React from "react";
import CasesTable from "container/cases/CasesTable";
import { RouteComponentProps } from "@reach/router";
import { PageHeader, Button } from "antd";

const AllCasesPage: React.FC<RouteComponentProps> = () => (
  <div>
    <PageHeader
      title={<h2>Cases</h2>}
      backIcon={false}
      style={{ paddingLeft: 0 }}
      extra={[<Button type="primary">Create Case</Button>]}
    />
    <CasesTable />
  </div>
);

export default AllCasesPage;
