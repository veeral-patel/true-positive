import React from "react";
import CasesTable from "../../container/cases/CasesTable";
import { RouteComponentProps } from "@reach/router";

const AllCasesPage: React.FC<RouteComponentProps> = () => (
  <div style={{ margin: "3%" }}>
    <CasesTable />
  </div>
);

export default AllCasesPage;
