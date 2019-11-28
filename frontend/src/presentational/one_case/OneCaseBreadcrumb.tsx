import { navigate, RouteComponentProps } from "@reach/router";
import { Breadcrumb } from "antd";
import React from "react";
import { paths } from "utils/constants";
import { getPathToACase } from "utils/pathHelpers";
import truncateString from "utils/truncateString";

interface Props extends RouteComponentProps {
  caseId: number;
  caseName: string;
  tabName: "Info" | "Indicators" | "Members" | "Tasks" | "Tree";
}

const OneCaseBreadcrumb: React.FC<Props> = ({ caseId, caseName, tabName }) => (
  <Breadcrumb style={{ margin: "16px 0" }}>
    <Breadcrumb.Item>
      <a onClick={() => navigate(paths.CASES_PATH)}>Cases</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <a onClick={() => navigate(getPathToACase(caseId))}>
        {truncateString(caseName, 90)}
      </a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>{tabName}</Breadcrumb.Item>
  </Breadcrumb>
);

export default OneCaseBreadcrumb;
