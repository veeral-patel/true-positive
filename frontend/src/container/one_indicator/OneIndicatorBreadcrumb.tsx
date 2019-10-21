import { navigate, RouteComponentProps } from "@reach/router";
import { Breadcrumb } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import { paths } from "utils/constants";
import { getPathToACase, getPathToCaseIndicators } from "utils/pathHelpers";
import truncateString from "utils/truncateString";

interface Props extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
  indicatorId?: number;
}

export default inject("activeCaseStore")(
  observer(
    class OneIndicatorBreadcrumb extends React.Component<Props> {
      render() {
        const { activeCaseStore, indicatorId } = this.props;

        const activeCase = activeCaseStore!.activeCase;

        if (!activeCase || !indicatorId) return null;

        const activeIndicator = activeCaseStore!.getIndicator(indicatorId);

        if (!activeIndicator) return null;

        return (
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <a onClick={() => navigate(paths.CASES_PATH)}>Cases</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a onClick={() => navigate(getPathToACase(activeCase.id))}>
                {truncateString(activeCase.name, 90)}
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a
                onClick={() => navigate(getPathToCaseIndicators(activeCase.id))}
              >
                Indicators
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {truncateString(activeIndicator.name, 90)}
            </Breadcrumb.Item>
          </Breadcrumb>
        );
      }
    }
  )
);
