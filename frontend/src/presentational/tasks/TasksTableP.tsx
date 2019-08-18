import { Table } from "antd";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import PriorityTagP from "presentational/shared/tags/PriorityTagP";
import StatusTagP from "presentational/shared/tags/StatusTagP";
import React from "react";
import ITask from "ts/interfaces/ITask";

const { Column } = Table;

interface ITasksTableProps {
  // list of case objects
  tasks: ITask[];
}

const rowSelection = {
  onChange: (selectedRowKeys: string[] | number[], selectedRows: ITask[]) => {}
};

const TasksTableP: React.FC<ITasksTableProps> = props => {
  const { tasks } = props;
  return (
    <Table
      dataSource={tasks}
      rowSelection={rowSelection}
      rowKey={record => record.id.toString()}
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
    </Table>
  );
};

export default TasksTableP;
