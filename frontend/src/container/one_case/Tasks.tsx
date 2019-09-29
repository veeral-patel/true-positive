import { navigate, RouteComponentProps } from "@reach/router";
import { Button, Icon, Input, Layout, Typography } from "antd";
import TasksTable from "container/one_case/TasksTable";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import { getPathToATask } from "utils/pathHelpers";

const { Content } = Layout;
const { Paragraph } = Typography;

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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2>Tasks ({activeCase.tasks.length})</h2>
                  <Button icon="plus">Create Task</Button>
                </div>
                <Paragraph>
                  Create a task for every piece of work to be completed in a
                  case.
                </Paragraph>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Input
                  placeholder="Search tasks"
                  prefix={<Icon type="search" />}
                />
              </div>
              <TasksTable
                tasks={activeCase.tasks}
                handleRowClick={(clickedTask, index, event) =>
                  navigate(getPathToATask(clickedTask.case.id, clickedTask.id))
                }
              />
            </Content>
          );
      }
    }
  )
);
