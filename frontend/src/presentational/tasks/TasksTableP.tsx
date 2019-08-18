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
}

const TasksTableP: React.FC<ITasksTableProps> = props => {
  const { tasks } = props;
  return (
    <Table
      dataSource={tasks}
      rowKey={record => record.id.toString()}
      pagination={{ hideOnSinglePage: true }}
    >
      <Column
        title="Name"
        dataIndex="name"
        key="name"
        sorter={(a: ITask, b: ITask) => a.name.localeCompare(b.name)}
      />
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
