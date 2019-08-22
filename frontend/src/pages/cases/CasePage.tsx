import { RouteComponentProps } from "@reach/router";
import CaseSider from "presentational/cases/CaseSiderP";
import React from "react";

interface ICasePageProps extends RouteComponentProps {}

const CasePage: React.FC<ICasePageProps> = () => (
  <div>
    <CaseSider />
  </div>
);

export default CasePage;
