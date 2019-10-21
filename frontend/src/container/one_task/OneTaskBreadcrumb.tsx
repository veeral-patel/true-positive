import { navigate, RouteComponentProps } from "@reach/router";
import { Breadcrumb } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import { paths } from "utils/constants";
import { getPathToACase, getPathToCaseTasks } from "utils/pathHelpers";
import truncateString from "utils/truncateString";

interface OneTaskBreadcrumbProps extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
  taskId?: number;
}

export default inject("activeCaseStore")(
  observer(
    class OneTaskBreadcrumb extends React.Component<OneTaskBreadcrumbProps> {
      render() {
        const { activeCaseStore, taskId } = this.props;

        const activeCase = activeCaseStore!.activeCase;

        if (!activeCase || !taskId) return null;

        const activeTask = activeCaseStore!.getTask(taskId);

        if (!activeTask) return null;

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
              <a onClick={() => navigate(getPathToCaseTasks(activeCase.id))}>
                Tasks
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {truncateString(activeTask.name, 90)}
            </Breadcrumb.Item>
          </Breadcrumb>
        );
      }
    }
  )
);
