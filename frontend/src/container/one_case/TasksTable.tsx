import { Table } from "antd";
import { ColumnFilterItem } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import PriorityTagP from "presentational/shared/tags/PriorityTagP";
import StatusTagP from "presentational/shared/tags/StatusTagP";
import React from "react";
import UserStore from "stores/UserStore";
import ITask from "ts/interfaces/ITask";
import compareUsers from "utils/compareUsers";
import { assignedToMatches } from "utils/filterCases";

const { Column } = Table;

interface ITasksTableProps {
  tasks: ITask[];
  handleRowClick: (clickedTask: ITask, index: number, event: Event) => void;
  userStore?: UserStore;
}

export default inject("userStore")(
  observer(
    class TasksTable extends React.Component<ITasksTableProps> {
      componentDidMount() {
        const { userStore } = this.props;
        userStore!.loadUsers();
      }

      render() {
        const { tasks, handleRowClick, userStore } = this.props;

        // show a loading state if our filter options are loading
        if (userStore!.usersAreLoading) {
          return <Table loading={true} />;
        }

        // populate user filter options -----

        const users = userStore!.users;
        let userFilters: ColumnFilterItem[] = [];

        if (users) {
          userFilters = users.map(user => ({
            text: user.username,
            value: user.username
          }));
        }

        // -----

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
              render={(statusName: string) => (
                <StatusTagP statusName={statusName} />
              )}
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
              filters={userFilters}
              onFilter={(filterWord, record) =>
                assignedToMatches(filterWord, record.assignedTo)
              }
            />
          </Table>
        );
      }
    }
  )
);
