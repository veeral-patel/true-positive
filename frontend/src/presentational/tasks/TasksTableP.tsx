import { Table } from "antd";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import PriorityTagP from "presentational/shared/tags/PriorityTagP";
import StatusTagP from "presentational/shared/tags/StatusTagP";
import React from "react";
import ITask from "ts/interfaces/ITask";
import compareUsers from "utils/compareUsers";

const { Column } = Table;

interface ITasksTableProps {
  // list of case objects
  tasks: ITask[];
  includeDescription?: boolean;
  handleRowClick: (clickedTask: ITask, index: number, event: Event) => void;
}

const TasksTableP: React.FC<ITasksTableProps> = ({
  tasks,
  includeDescription,
  handleRowClick
}) => {
  let includeDescriptionInTable: boolean = true;
  if (includeDescription !== undefined) {
    includeDescriptionInTable = includeDescription;
  }
  return (
    <Table
      dataSource={tasks}
      rowKey={record => record.id.toString()}
      pagination={{ hideOnSinglePage: true }}
      onRowClick={handleRowClick}
    >
      <Column
        title="Name"
        dataIndex="name"
        key="name"
        sorter={(a: ITask, b: ITask) => a.name.localeCompare(b.name)}
      />
      {includeDescriptionInTable && (
        <Column
          title="Description"
          dataIndex="description"
          key="description"
          sorter={(a: ITask, b: ITask) =>
            a.description.localeCompare(b.description)
          }
        />
      )}
      <Column
        title="Tags"
        dataIndex="tags"
        key="tags"
        render={tags => <ListOfTagsP tags={tags} />}
      />
      <Column
        title="Status"
        dataIndex="status.name"
        key="status"
        render={(statusName: string) => <StatusTagP statusName={statusName} />}
        sorter={(a: ITask, b: ITask) =>
          a.status.name.localeCompare(b.status.name)
        }
      />
      <Column
        title="Priority"
        dataIndex="priority.name"
        key="priority"
        render={(priorityName: string) => (
          <PriorityTagP priorityName={priorityName} />
        )}
        sorter={(a: ITask, b: ITask) =>
          a.priority.name.localeCompare(b.priority.name)
        }
      />
      <Column
        title="Assigned To"
        dataIndex="assignedTo.username"
        key="assigned_to"
        sorter={(a: ITask, b: ITask) =>
          compareUsers(a.assignedTo, b.assignedTo)
        }
      />
    </Table>
  );
};

export default TasksTableP;
