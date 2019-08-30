import { navigate } from "@reach/router";
import { Breadcrumb } from "antd";
import React from "react";
import { paths } from "utils/constants";
import { getPathToACase, getPathToCaseTasks } from "utils/pathHelpers";

interface OneTaskBreadcrumbProps {
  caseName: string;
  caseId: number;
  taskName: string;
}

const OneTaskBreadcrumbP: React.FC<OneTaskBreadcrumbProps> = ({
  caseName,
  caseId,
  taskName
}) => (
  <Breadcrumb style={{ margin: "16px 0" }}>
    <Breadcrumb.Item>
      <a onClick={() => navigate(paths.CASES_PATH)}>Cases</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <a onClick={() => navigate(getPathToACase(caseId))}>{caseName}</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <a onClick={() => navigate(getPathToCaseTasks(caseId))}>Tasks</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>{taskName}</Breadcrumb.Item>
  </Breadcrumb>
);

export default OneTaskBreadcrumbP;
