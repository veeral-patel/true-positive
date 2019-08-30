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

        // should always be defined, because we're handling the null
        // and loading cases above, with a HOC.
        const activeCase = activeCaseStore!.activeCase;

        if (!taskId) {
          notification.error({
            message: "Could not extract this task's ID from the URL",
            description: "Ensure you're on a valid URL"
          });
        }

        // find the active case's tasks that match our taskId from our route
        const matchingTasks = activeCase!.tasks.filter(
          task => task.id === taskId
        );
        if (matchingTasks.length === 0) {
          notification.error({
            message: `Could not find a task with ID ${taskId}`,
            description: "Ensure you're on a valid URL"
          });
          return (
            <ErrorP
              title={`Could not find a task with ID ${taskId}`}
              subtitle="Ensure you're on a valid URL"
            />
          );
        }

        const activeTask = matchingTasks.pop();
        if (!activeTask) {
          notification.error({
            message: "Could not load the task",
            description: "Task is undefined"
          });
          return (
            <ErrorP
              title="Could not load the task"
              subtitle="Task is undefined"
            />
          );
        }

        return <OneTaskP activeTask={activeTask} />;
      }
    }
  )
);
