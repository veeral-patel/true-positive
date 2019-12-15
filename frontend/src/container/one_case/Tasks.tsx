import { PlusOutlined } from "@ant-design/icons";
import { RouteComponentProps } from "@reach/router";
import { Button, Empty, Form, Input, Layout, Modal, Typography } from "antd";
import CreateTaskInput from "container/one_case/CreateTaskInput";
import CreateTaskModal from "container/one_case/CreateTaskModal";
import TaskGroup from "container/one_case/TaskGroup";
import TaskProgress from "container/shared/tasks/TaskProgress";
import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import UIStore from "stores/UIStore";

const { Content } = Layout;
const { Paragraph, Text } = Typography;

interface Props extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
  uiStore?: UIStore;
}

function Tasks({ activeCaseStore, uiStore }: Props) {
  const [openModal, setOpenModal] = useState<
    "CREATE_TASK" | "CREATE_TASK_GROUP" | null
  >(null);

  const activeCase = activeCaseStore!.activeCase;

  // should always render, since we're catching errors and showing
  // our spinner above this, as a HOC
  if (activeCase) {
    const taskGroups = activeCase.taskGroups.map(group => (
      <TaskGroup
        name={group.name}
        tasks={group.tasks}
        key={group.id}
        id={group.id}
      />
    ));

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
          {activeCase.totalTaskCount === 0 ? (
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
              <div style={{ float: "right" }}>
                <Button
                  type="link"
                  onClick={() => setOpenModal("CREATE_TASK_GROUP")}
                  style={{ padding: 0, marginTop: "0.5em" }}
                >
                  Create a task group
                </Button>
              </div>
              <div>{taskGroups}</div>
            </>
          )}
        </Content>
        <CreateTaskModal
          visible={openModal === "CREATE_TASK"}
          handleClose={() => setOpenModal(null)}
        />
        <Modal
          visible={openModal === "CREATE_TASK_GROUP"}
          onCancel={() => setOpenModal(null)}
          title="Create a Task Group"
        >
          <Paragraph>
            Categorize your tasks using task groups. For example, you might
            create task groups for Triage, Containment, and Remediation.
          </Paragraph>
          <Form layout="vertical" colon={false}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please name your task group" }
              ]}
            >
              <Input placeholder="Containment" />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
  return null;
}

export default inject("activeCaseStore", "uiStore")(observer(Tasks));
