import { navigate, RouteComponentProps } from "@reach/router";
import { Breadcrumb } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import { paths } from "utils/constants";
import { getPathToACase, getPathToCaseIndicators } from "utils/pathHelpers";

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

        if (!activeCase || !indicatorId) return <p>Error</p>;

        const activeIndicator = activeCaseStore!.getIndicator(indicatorId);

        if (!activeIndicator) return <p>Error</p>;

        return (
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <a onClick={() => navigate(paths.CASES_PATH)}>Cases</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a onClick={() => navigate(getPathToACase(activeCase.id))}>
                {activeCase.name}
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a
                onClick={() => navigate(getPathToCaseIndicators(activeCase.id))}
              >
                Indicators
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{activeIndicator.name}</Breadcrumb.Item>
          </Breadcrumb>
        );
      }
    }
  )
);
