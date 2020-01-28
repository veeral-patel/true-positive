import { PlusOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { RouteComponentProps } from "@reach/router";
import { Button, Empty, Layout, message, notification, Typography } from "antd";
import CreateTaskGroupModal from "container/admin/CreateTaskGroupModal";
import CreateTaskModal from "container/one_case/CreateTaskModal";
import TaskProgress from "container/shared/tasks/TaskProgress";
import { inject, observer } from "mobx-react";
import CREATE_A_TASK_GROUP from "mutations/createTaskGroup";
import React, { useState } from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import UIStore from "stores/UIStore";
import SortableTGList from "./SortableTGList";

const { Content } = Layout;
const { Paragraph } = Typography;

interface Props extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
  uiStore?: UIStore;
}

function Tasks({ activeCaseStore, uiStore }: Props) {
  const [openModal, setOpenModal] = useState<
    "CREATE_TASK" | "CREATE_TASK_GROUP" | null
  >(null);

  const [createTaskGroup] = useMutation(CREATE_A_TASK_GROUP, {
    onCompleted: () => {
      message.success("Created task group");
      activeCaseStore!.loadActiveCase();
    },
    onError: error => {
      notification.error({
        message: "Failed to create task group",
        description: error.message
      });
    }
  });

  const activeCase = activeCaseStore!.activeCase;

  // should always render, since we're catching errors and showing
  // our spinner above this, as a HOC
  if (activeCase) {
    const taskGroups = <SortableTGList theCase={activeCase} />;

    return (
      <>
        <Content
          style={{
            backgroundColor: uiStore!.theme === "LIGHT" ? "#fff" : "#141414",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          {activeCase.taskGroupCount === 0 ? (
            <Empty
              description={
                <div style={{ marginTop: "1em" }}>
                  <h3>No tasks</h3>
                  <Paragraph>
                    A task is a piece of work to be completed in a case.
                  </Paragraph>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => setOpenModal("CREATE_TASK")}
                  >
                    Create a task
                  </Button>
                </div>
              }
            />
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between"
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
              <Button
                type="link"
                onClick={() => setOpenModal("CREATE_TASK_GROUP")}
                style={{ padding: 0, marginBottom: "1em" }}
              >
                Create a task group
              </Button>
              <div>{taskGroups}</div>
            </>
          )}
        </Content>
        <CreateTaskGroupModal
          visible={openModal === "CREATE_TASK_GROUP"}
          handleClose={() => setOpenModal(null)}
          handleFinish={taskGroupName => {
            activeCaseStore!.activeCase &&
              createTaskGroup({
                variables: {
                  input: {
                    name: taskGroupName,
                    caseId: activeCaseStore!.activeCase.id
                  }
                }
              });
          }}
        />
        <CreateTaskModal
          visible={openModal === "CREATE_TASK"}
          handleClose={() => setOpenModal(null)}
        />
      </>
    );
  }
  return null;
}

export default inject("activeCaseStore", "uiStore")(observer(Tasks));
