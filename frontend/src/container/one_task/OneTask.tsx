import { RouteComponentProps } from "@reach/router";
import { notification } from "antd";
import { inject, observer } from "mobx-react";
import OneTaskP from "presentational/one_task/OneTaskP";
import ErrorP from "presentational/shared/errors/ErrorP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

interface OneTaskProps extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
  taskId?: number;
}

export default inject("activeCaseStore")(
  observer(
    class OneTask extends React.Component<OneTaskProps> {
      render() {
        const { activeCaseStore, taskId } = this.props;

        const activeCase = activeCaseStore!.activeCase;

        if (!taskId) {
          notification.error({
            message: "Could not extract this task's ID from the URL",
            description: "Ensure you're at a valid URL"
          });
          return (
            <ErrorP
              title="Could not extract this task's ID from the URL"
              subtitle="Ensure you're at a valid URL"
            />
          );
        }

        const activeTask = activeCaseStore!.getTask(taskId);

        if (!activeTask) {
          notification.error({
            message: "Could not load task",
            description: "Ensure that a task with this ID exists"
          });
          return (
            <ErrorP
              title="Could not load task"
              subtitle="Ensure that a task with this ID exists"
            />
          );
        }

        // should always render, because we handle error/loading state
        // above, in a HOC
        if (activeCase)
          return (
            <OneTaskP
              activeTask={activeTask}
              activeCase={activeCase}
              renameTask={activeCaseStore!.renameTask}
              changeTaskStatus={activeCaseStore!.changeTaskStatus}
              changeTaskPriority={activeCaseStore!.changeTaskPriority}
            />
          );
      }
    }
  )
);
