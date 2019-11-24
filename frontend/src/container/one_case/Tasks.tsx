import { navigate, RouteComponentProps } from "@reach/router";
import {
  Button,
  Checkbox,
  Empty,
  Icon,
  Layout,
  List,
  Tooltip,
  Typography
} from "antd";
import CreateTaskInput from "container/one_case/CreateTaskInput";
import CreateTaskModal from "container/one_case/CreateTaskModal";
import TaskProgress from "container/shared/tasks/TaskProgress";
import { inject, observer } from "mobx-react";
import "presentational/shared/styles/hoverable_item.css";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import ITask from "ts/interfaces/ITask";
import { getPathToATask } from "utils/pathHelpers";
import truncateString from "utils/truncateString";

const { Content } = Layout;
const { Paragraph, Text } = Typography;

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
          const tasks = activeCase.tasks;
          const doneTasks = activeCase.tasks.filter(task => task.done);

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
                {tasks.length === 0 ? (
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
                        Tasks ({doneTasks.length}/{tasks.length})
                      </h3>
                      <TaskProgress theCase={activeCase} />
                    </div>
                    <div style={{ float: "right", marginBottom: "6px" }}>
                      <Button
                        type="link"
                        style={{ color: "rgb(130, 130, 130)" }}
                      >
                        Create from template
                      </Button>
                    </div>
                    <CreateTaskInput
                      handleEnter={event => {
                        const newTask = event.currentTarget.value;
                        activeCaseStore!.createTask(newTask, activeCase.id);
                      }}
                    />
                    <div style={{ marginBottom: "2em" }} />
                    <List<ITask>
                      itemLayout="horizontal"
                      dataSource={tasks}
                      bordered
                      renderItem={task => (
                        <List.Item>
                          <List.Item.Meta
                            title={
                              <div>
                                <Checkbox
                                  style={{ marginRight: "1.0em" }}
                                  defaultChecked={task.done}
                                  onChange={event => {
                                    activeCaseStore!.markTaskAsDone(
                                      task.id,
                                      event.target.checked
                                    );
                                  }}
                                />
                                <a
                                  onClick={() =>
                                    navigate(
                                      getPathToATask(task.case.id, task.id)
                                    )
                                  }
                                >
                                  {truncateString(task.name, 75)}
                                </a>
                              </div>
                            }
                            description={
                              <div>
                                {task.assignedTo !== null &&
                                  `Assigned to ${task.assignedTo.username}`}
                              </div>
                            }
                          />
                          <Tooltip title={`${task.comments.length} comment(s)`}>
                            <Icon type="message" /> {task.comments.length}
                          </Tooltip>
                        </List.Item>
                      )}
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
