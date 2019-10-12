import { navigate, RouteComponentProps } from "@reach/router";
import { Button, Empty, Layout, Typography } from "antd";
import CreateTaskModal from "container/one_case/CreateTaskModal";
import TasksTable from "container/one_case/TasksTable";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import { getPathToATask } from "utils/pathHelpers";

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
                {activeCase.tasks.length === 0 ? (
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
                          Create Task
                        </Button>
                      </div>
                    }
                  />
                ) : (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <h3>Tasks ({activeCase.tasks.length})</h3>
                      <Button
                        icon="plus"
                        onClick={() =>
                          this.setState({ openModal: "CREATE_TASK" })
                        }
                      >
                        Create Task
                      </Button>
                    </div>
                    <Paragraph>
                      Create a task for every piece of work to be completed in a
                      case.
                    </Paragraph>
                    <TasksTable
                      tasks={activeCase.tasks}
                      handleRowClick={(clickedTask, index, event) =>
                        navigate(
                          getPathToATask(clickedTask.case.id, clickedTask.id)
                        )
                      }
                    />
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
