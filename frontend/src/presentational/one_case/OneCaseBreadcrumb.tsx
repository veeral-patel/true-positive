import { navigate } from "@reach/router";
import { Breadcrumb } from "antd";
import React from "react";
import { paths } from "utils/constants";

interface IOneCaseBreadcrumbProps {
  caseName: string;
  tabName: "Info" | "Indicators" | "Members" | "Tasks" | "Tree";
}

const OneCaseBreadcrumb: React.FC<IOneCaseBreadcrumbProps> = ({
  caseName,
  tabName
}) => (
  <Breadcrumb style={{ margin: "16px 0" }}>
    <Breadcrumb.Item>
      <a onClick={() => navigate(paths.CASES_PATH)}>Cases</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>{caseName}</Breadcrumb.Item>
    <Breadcrumb.Item>{tabName}</Breadcrumb.Item>
  </Breadcrumb>
);

export default OneCaseBreadcrumb;
