import { RouteComponentProps } from "@reach/router";
import { Button, Empty, Layout, Typography } from "antd";
import CreateTaskInput from "container/one_case/CreateTaskInput";
import CreateTaskModal from "container/one_case/CreateTaskModal";
import TaskProgress from "container/shared/tasks/TaskProgress";
import { inject, observer } from "mobx-react";
import "presentational/shared/styles/hoverable_item.css";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import TaskGroup from "./TaskGroup";

const { Content } = Layout;
const { Paragraph } = Typography;

interface Props extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
}

interface State {
  openModal: "CREATE_TASK" | null;
}

export default inject("activeCaseStore")(
  observer(
    class Tasks extends React.Component<Props, State> {
      constructor(props: Props) {
        super(props);
        this.state = {
          openModal: null
        };
      }

      render() {
        const { activeCaseStore } = this.props;
        const { openModal } = this.state;

        const activeCase = activeCaseStore!.activeCase;

        // should always render, since we're catching errors and showing
        // our spinner above this, as a HOC
        if (activeCase) {
          const taskGroups = activeCase.taskGroups.map(group => (
            <TaskGroup name={group.name} tasks={group.tasks} key={group.id} />
          ));

          return (
            <div>
              <Content
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 0,
                  minHeight: 280
                }}
              >
                {activeCase.totalTaskCount === 0 ? (
                  <Empty
                    description={
                      <div style={{ marginTop: "1em" }}>
                        <h3>No tasks</h3>
                        <Paragraph>
                          A task is a piece of work to be completed in a case.
                        </Paragraph>
                        <Button
                          icon="plus"
                          onClick={() =>
                            this.setState({ openModal: "CREATE_TASK" })
                          }
                        >
                          Create a task
                        </Button>
                      </div>
                    }
                  />
                ) : (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1em"
                      }}
                    >
                      <h3>
                        Tasks ({activeCase.completedTaskCount}/
                        {activeCase.totalTaskCount})
                      </h3>
                      <TaskProgress
                        completedTaskCount={activeCase.completedTaskCount}
                        totalTaskCount={activeCase.totalTaskCount}
                      />
                    </div>
                    <CreateTaskInput
                      handleEnter={event => {
                        const newTask = event.currentTarget.value;
                        activeCaseStore!.createTask(newTask, activeCase.id);
                      }}
                    />
                    {taskGroups}
                  </div>
                )}
              </Content>
              <CreateTaskModal
                visible={openModal === "CREATE_TASK"}
                handleClose={() => this.setState({ openModal: null })}
              />
            </div>
          );
        }
      }
    }
  )
);
