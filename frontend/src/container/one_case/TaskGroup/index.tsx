import { useMutation } from "@apollo/react-hooks";
import { message, notification } from "antd";
import CreateTaskInput from "container/one_case/CreateTaskInput";
import SortableTaskList from "container/one_case/SortableTaskList";
import Heading from "container/one_case/TaskGroup/Heading";
import CREATE_A_TASK from "mutations/createTask";
import React from "react";
import ITask from "ts/interfaces/ITask";

interface Props {
  name: string;
  tasks: ITask[];
  id: number;
}

function TaskGroup({ name, tasks, id }: Props) {
  const [createTask] = useMutation(CREATE_A_TASK, {
    onCompleted: function() {
      message.success("Created the task");
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
        <Heading heading={name} id={id} />
      </div>
      <div style={{ marginTop: "0.5em" }}>
        <CreateTaskInput
          handleEnter={event => {
            const nameOfNewTask = event.currentTarget.value;
            createTask({
              variables: {
                input: {
                  taskGroupId: id,
                  name: nameOfNewTask
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

export default TaskGroup;
