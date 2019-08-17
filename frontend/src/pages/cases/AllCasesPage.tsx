import React from "react";
import CasesTable from "../../container/cases/CasesTable";
import { RouteComponentProps } from "@reach/router";

const AllCasesPage: React.FC<RouteComponentProps> = () => (
  <div>
    <h2>Cases</h2>
    <br />
    <CasesTable />
  </div>
);

export default AllCasesPage;
