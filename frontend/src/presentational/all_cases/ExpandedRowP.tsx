import { navigate } from "@reach/router";
import { Typography } from "antd";
import TasksTableP from "container/one_case/TasksTable";
import React from "react";
import ITask from "ts/interfaces/ITask";
import { getPathToATask } from "utils/pathHelpers";

const { Paragraph } = Typography;

interface IExpandedRowProps {
  caseId: number;
  description: string;
  tasks: ITask[];
}

const ExpandedRow: React.FC<IExpandedRowProps> = ({
  caseId,
  description,
  tasks
}) => (
  <div style={{ marginTop: "20px", marginBottom: "80px", width: "85%" }}>
    <Paragraph style={{ margin: "0px", marginBottom: "40px" }}>
      {description}
    </Paragraph>
    <div>
      {tasks.length > 0 && (
        <div>
          <h3>Tasks ({tasks.length})</h3>
          <TasksTableP
            tasks={tasks}
            handleRowClick={(clickedTask, index, event) =>
              navigate(getPathToATask(caseId, clickedTask.id))
            }
          />
        </div>
      )}
    </div>
  </div>
);

export default ExpandedRow;
