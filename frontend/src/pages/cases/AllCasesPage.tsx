import { RouteComponentProps } from "@reach/router";
import { Button, PageHeader } from "antd";
import CasesTable from "container/cases/CasesTable";
import FilterInput from "container/cases/FilterInput";
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
      <FilterInput />
    </div>
    <CasesTable />
  </div>
);

export default AllCasesPage;
