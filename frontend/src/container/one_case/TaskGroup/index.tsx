import { useMutation } from "@apollo/react-hooks";
import { message, notification } from "antd";
import CreateTaskInput from "container/one_case/CreateTaskInput";
import SortableTaskList from "container/one_case/SortableTaskList";
import Heading from "container/one_case/TaskGroup/Heading";
import { inject, observer } from "mobx-react";
import CREATE_A_TASK from "mutations/createTask";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import ITask from "ts/interfaces/ITask";

interface Props {
  name: string;
  tasks: ITask[];
  taskGroupId: number;
  caseId: number;
  activeCaseStore?: ActiveCaseStore;
  // whether this task group is to be displayed in a case template (not a case)
  forCaseTemplate?: boolean;
}

function TaskGroup({
  name,
  tasks,
  taskGroupId,
  activeCaseStore,
  caseId,
  forCaseTemplate = false
}: Props) {
  const [createTask] = useMutation(CREATE_A_TASK, {
    onCompleted: function() {
      message.success("Created the task");
      if (!forCaseTemplate) activeCaseStore!.loadActiveCase();
    },
    onError: function(error) {
      notification.error({
        message: "Could not create task",
        description: error.message
      });
    }
  });

  return (
    <div style={{ marginBottom: "3em" }}>
      <div>
        <Heading
          heading={name}
          id={taskGroupId}
          forCaseTemplate={forCaseTemplate}
        />
      </div>
      <div style={{ marginTop: "0.5em" }}>
        <CreateTaskInput
          handleEnter={event => {
            const nameOfNewTask = event.currentTarget.value;
            if (!nameOfNewTask) return; // do nothing if the name is empty
            createTask({
              variables: {
                input: {
                  name: nameOfNewTask,
                  taskGroupId,
                  caseId
                }
              }
            });
          }}
        />
      </div>
      <div style={{ marginTop: "1em" }}>
        <SortableTaskList existingTasks={tasks} />
      </div>
    </div>
  );
}

export default inject("activeCaseStore")(observer(TaskGroup));
