import { navigate, RouteComponentProps } from "@reach/router";
import { Icon, Input, Layout } from "antd";
import { inject, observer } from "mobx-react";
import TasksTableP from "presentational/shared/tasks/TasksTableP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import { getPathToATask } from "utils/pathHelpers";
const { Content } = Layout;

interface TaskProps extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
}

export default inject("activeCaseStore")(
  observer(
    class Task extends React.Component<TaskProps> {
      render() {
        const { activeCaseStore } = this.props;
        const activeCase = activeCaseStore!.activeCase;

        // should always render, since we're catching errors and showing
        // our spinner above this, as a HOC
        if (activeCase)
          return (
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              <div>
                <h2>Tasks ({activeCase.tasks.length})</h2>
              </div>

              <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                <Input
                  placeholder="Create a task"
                  prefix={<Icon type="plus" />}
                  suffix={<Icon type="arrow-right" />}
                />
              </div>
              <TasksTableP
                tasks={activeCase.tasks}
                includeDescription={false}
                handleRowClick={(clickedTask, index, event) =>
                  navigate(getPathToATask(activeCase.id, clickedTask.id))
                }
              />
            </Content>
          );
      }
    }
  )
);
