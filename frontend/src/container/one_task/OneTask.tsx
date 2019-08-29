import { RouteComponentProps } from "@reach/router";
import { notification } from "antd";
import { inject, observer } from "mobx-react";
import OneTaskP from "presentational/one_task/OneTaskP";
import React from "react";
import ActiveTaskStore from "stores/ActiveTaskStore";

interface OneTaskProps extends RouteComponentProps {
  activeTaskStore?: ActiveTaskStore;
  taskId?: number;
}

export default inject("activeTaskStore")(
  observer(
    class OneTask extends React.Component<OneTaskProps> {
      componentDidMount() {
        const { activeTaskStore, taskId } = this.props;
        if (taskId) {
          activeTaskStore!.setActiveTaskId(taskId);
        } else {
          notification.error({
            message: "Unable to extract the task's ID from the URL",
            description: "Ensure you're on a valid URL"
          });
        }
      }

      render() {
        return <OneTaskP />;
      }
    }
  )
);
