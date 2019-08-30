import { navigate, RouteComponentProps } from "@reach/router";
import { Breadcrumb } from "antd";
import React from "react";
import { paths } from "utils/constants";
import { getPathToACase } from "utils/pathHelpers";

interface IOneCaseBreadcrumbProps extends RouteComponentProps {
  caseId: number;
  caseName: string;
  tabName: "Info" | "Observables" | "Members" | "Tasks" | "Tree";
}

const OneCaseBreadcrumb: React.FC<IOneCaseBreadcrumbProps> = ({
  caseId,
  caseName,
  tabName
}) => (
  <Breadcrumb style={{ margin: "16px 0" }}>
    <Breadcrumb.Item>
      <a onClick={() => navigate(paths.CASES_PATH)}>Cases</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <a onClick={() => navigate(getPathToACase(caseId))}>{caseName}</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>{tabName}</Breadcrumb.Item>
  </Breadcrumb>
);

export default OneCaseBreadcrumb;
