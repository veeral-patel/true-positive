import { RouteComponentProps } from "@reach/router";
import { Button, PageHeader } from "antd";
import ActionsDropdown from "container/cases/ActionsDropdown";
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
    <span
      style={{ marginBottom: "30px", width: "40%", display: "inline-block" }}
    >
      <FilterInput />
    </span>
    <span style={{ float: "right", paddingRight: "24px" }}>
      <ActionsDropdown />
    </span>
    <CasesTable />
  </div>
);

export default AllCasesPage;
