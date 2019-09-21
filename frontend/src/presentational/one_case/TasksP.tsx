import { navigate } from "@reach/router";
import { Icon, Input, Layout } from "antd";
import TasksTableP from "presentational/shared/tasks/TasksTableP";
import React from "react";
import ITask from "ts/interfaces/ITask";
import { getPathToATask } from "utils/pathHelpers";
const { Content } = Layout;

interface TasksProps {
  caseId: number;
  caseName: string;
  tasks: ITask[];
}

const TasksP: React.FC<TasksProps> = ({ caseId, caseName, tasks }) => (
  <div>
    <Content
      style={{
        background: "#fff",
        padding: 24,
        margin: 0,
        minHeight: 280
      }}
    >
      <div>
        <h2>Tasks ({tasks.length})</h2>
      </div>

      <div style={{ marginTop: "30px", marginBottom: "30px" }}>
        <Input
          placeholder="Create a task"
          prefix={<Icon type="plus" />}
          suffix={<Icon type="arrow-right" />}
        />
      </div>
      <TasksTableP
        tasks={tasks}
        includeDescription={false}
        handleRowClick={(clickedTask, index, event) =>
          navigate(getPathToATask(caseId, clickedTask.id))
        }
      />
    </Content>
  </div>
);

export default TasksP;
