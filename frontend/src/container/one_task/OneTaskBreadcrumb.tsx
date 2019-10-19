import { RouteComponentProps } from "@reach/router";
import { notification } from "antd";
import { inject, observer } from "mobx-react";
import OneTaskBreadcrumbP from "presentational/one_task/OneTaskBreadcrumbP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

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

        if (!taskId) {
          notification.error({
            message: "Could not extract this task's ID from the URL",
            description: "Ensure you're at a valid URL"
          });
          return <p>Error</p>;
        }

        const activeTask = activeCaseStore!.getTask(taskId);

        if (!activeTask) {
          return <p>Error</p>;
        }

        if (activeCase)
          return (
            <OneTaskBreadcrumbP
              caseName={activeCase.name}
              caseId={activeCase.id}
              taskName={activeTask.name}
            />
          );
      }
    }
  )
);
