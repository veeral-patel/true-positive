import { navigate } from "@reach/router";
import { Table } from "antd";
import { ColumnFilterItem } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import React from "react";
import PriorityStore from "stores/PriorityStore";
import StatusStore from "stores/StatusStore";
import UserStore from "stores/UserStore";
import ITask from "ts/interfaces/ITask";
import compareUsers from "utils/compareUsers";
import formatISO8601 from "utils/formatISO8601";
import { assignedToMatches, createdByMatches } from "utils/matchesFilter";
import { getPathToACase } from "utils/pathHelpers";

const { Column } = Table;

interface ITasksTableProps {
  tasks: ITask[];
  handleRowClick: (clickedTask: ITask, index: number, event: Event) => void;
  userStore?: UserStore;
  statusStore?: StatusStore;
  priorityStore?: PriorityStore;

  // whether to include the created by and created at columns
  includeExtraColumns: boolean;
}

export default inject("userStore", "statusStore", "priorityStore")(
  observer(
    class TasksTable extends React.Component<ITasksTableProps> {
      static defaultProps = {
        includeExtraColumns: false
      };

      componentDidMount() {
        const { userStore, statusStore, priorityStore } = this.props;
        userStore!.loadUsers();
        statusStore!.loadStatuses();
        priorityStore!.loadPriorities();
      }

      render() {
        const {
          tasks,
          handleRowClick,
          userStore,
          statusStore,
          priorityStore,
          includeExtraColumns
        } = this.props;

        // show a loading state if our filter options are loading
        if (userStore!.usersAreLoading) {
          return <Table loading={true} />;
        }

        // populate status filter options -----
        const statuses = statusStore!.statuses;
        let statusFilters: ColumnFilterItem[] = [];

        if (statuses) {
          statusFilters = statuses.map(status => ({
            text: status.name,
            value: status.name
          }));
        }

        // populate priority filter options ------
        const priorities = priorityStore!.priorities;
        let priorityFilters: ColumnFilterItem[] = [];

        if (priorities) {
          priorityFilters = priorities.map(priority => ({
            text: priority.name,
            value: priority.name
          }));
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
              render={tags => <ListOfTagsP tags={tags} limit={3} />}
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
            {includeExtraColumns && (
              <Column
                title="Created By"
                dataIndex="createdBy.username"
                key="created_by"
                sorter={(a: ITask, b: ITask) =>
                  compareUsers(a.createdBy, b.createdBy)
                }
                filters={userFilters}
                onFilter={(filterWord, record) =>
                  createdByMatches(filterWord, record.createdBy)
                }
              />
            )}
            {includeExtraColumns && (
              <Column
                title="Created At (UTC)"
                dataIndex="createdAt"
                key="created_at"
                sorter={(a: ITask, b: ITask) =>
                  a.createdAt.localeCompare(b.createdAt)
                }
                render={(text, task, index) => formatISO8601(task.createdAt)}
              />
            )}
            {includeExtraColumns && (
              <Column
                title="Case"
                dataIndex="case"
                key="case"
                render={(text, task: ITask, index) => (
                  <a
                    onClick={e => {
                      e.stopPropagation();
                      navigate(getPathToACase(task.case.id));
                    }}
                  >
                    {task.case.name}
                  </a>
                )}
              />
            )}
          </Table>
        );
      }
    }
  )
);
