import { navigate, RouteComponentProps } from "@reach/router";
import { Breadcrumb } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import React from "react";
import { paths } from "utils/constants";
import { getPathToACase, getPathToCaseTasks } from "utils/pathHelpers";

interface OneTaskBreadcrumbProps extends RouteComponentProps {
  caseName: string;
  caseId: number;
}

const OneTaskBreadcrumb: React.FC<OneTaskBreadcrumbProps> = ({
  caseName,
  caseId
}) => (
  <Breadcrumb style={{ margin: "16px 0" }}>
    <Breadcrumb.Item>
      <a onClick={() => navigate(paths.CASES_PATH)}>Cases</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <a onClick={() => navigate(getPathToACase(caseId))}>{caseName}</a>
    </Breadcrumb.Item>
    <BreadcrumbItem>
      <a onClick={() => navigate(getPathToCaseTasks(caseId))}>Tasks</a>
    </BreadcrumbItem>
  </Breadcrumb>
);

export default OneTaskBreadcrumb;
