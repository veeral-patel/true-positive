import { navigate } from "@reach/router";
import { Spin, Table } from "antd";
import { ColumnFilterItem } from "antd/lib/table/interface";
import TaskProgress from "container/shared/tasks/TaskProgress";
import { inject, observer } from "mobx-react";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import PriorityTagP from "presentational/shared/tags/PriorityTagP";
import StatusTagP from "presentational/shared/tags/StatusTagP";
import React from "react";
import CaseStore from "stores/AllCasesStore";
import PriorityStore from "stores/PriorityStore";
import StatusStore from "stores/StatusStore";
import UserStore from "stores/UserStore";
import ICase from "ts/interfaces/ICase";
import { paths } from "utils/constants";
import formatISO8601 from "utils/formatISO8601";
import truncateString from "utils/truncateString";

const { Column } = Table;

interface ICasesTableProps {
  allCasesStore?: CaseStore;
  statusStore?: StatusStore;
  priorityStore?: PriorityStore;
  userStore?: UserStore;
}

export default inject(
  "allCasesStore",
  "statusStore",
  "priorityStore",
  "userStore"
)(
  observer(
    class CasesTable extends React.Component<ICasesTableProps> {
      componentDidMount() {
        const {
          allCasesStore,
          statusStore,
          priorityStore,
          userStore
        } = this.props;
        allCasesStore!.loadCases();
        statusStore!.loadStatuses();
        priorityStore!.loadPriorities();
        userStore!.loadUsers();
      }

      render() {
        const {
          allCasesStore,
          statusStore,
          priorityStore,
          userStore
        } = this.props;

        if (
          allCasesStore!.casesAreLoading ||
          statusStore!.statusesAreLoading ||
          priorityStore!.prioritiesAreLoading ||
          userStore!.usersAreLoading
        ) {
          return <Table loading={true} />;
        }
        // populate status filter options
        const statuses = statusStore!.statuses;
        let statusFilters: ColumnFilterItem[] = [];

        if (statuses) {
          statusFilters = statuses.map(status => ({
            text: status.name,
            value: status.name
          }));
        }

        // populate priority filter options
        const priorities = priorityStore!.priorities;
        let priorityFilters: ColumnFilterItem[] = [];

        if (priorities) {
          priorityFilters = priorities.map(priority => ({
            text: priority.name,
            value: priority.name
          }));
        }

        // populate user filter options
        const users = userStore!.users;
        let userFilters: ColumnFilterItem[] = [];

        if (users) {
          userFilters = users.map(user => ({
            text: user.username,
            value: user.username
          }));
        }

        if (allCasesStore!.casesAreLoading) {
          return <Spin />;
        }

        return (
          <Table<ICase>
            dataSource={allCasesStore!.filteredCases}
            rowKey={theCase => theCase.id.toString()}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  navigate(`${paths.CASES_PATH}/${record.id}`);
                }
              };
            }}
          >
            <Column
              title="Name"
              dataIndex="name"
              key="name"
              // sorter={(a: ICase, b: ICase) => a.name.localeCompare(b.name)}
              render={(name, theCase: ICase, index) => (
                <div>
                  <div>{truncateString(name, 40)}</div>
                  <div style={{ lineHeight: 2.0, marginTop: "0.5em" }}>
                    <ListOfTagsP tags={theCase.tags} limit={4} />
                  </div>
                </div>
              )}
            />
            <Column
              title="Status"
              key="status"
              render={(text, theCase, index: number) => (
                <StatusTagP statusName={(theCase as ICase).status.name} />
              )}
              // sorter={(a: ICase, b: ICase) =>
              //   a.status.name.localeCompare(b.status.name)
              // }
              // filters={statusFilters}
              // onFilter={(filterWord: string, record: ICase) =>
              //   statusMatches(filterWord, record.status)
              // }
            />
            <Column
              title="Priority"
              key="priority"
              render={(text, theCase, index: number) => (
                <PriorityTagP priorityName={(theCase as ICase).priority.name} />
              )}
              // sorter={(a: ICase, b: ICase) =>
              //   a.priority.name.localeCompare(b.priority.name)
              // }
              // filters={priorityFilters}
              // onFilter={(filterWord: string, record: ICase) =>
              //   priorityMatches(filterWord, record.priority)
              // }
            />
            <Column
              title="Assigned To"
              dataIndex="assignedTo.username"
              key="assigned_to"
              // sorter={(a: ICase, b: ICase) =>
              //   compareUsers(a.assignedTo, b.assignedTo)
              // }
              // filters={userFilters}
              // onFilter={(filterWord: string, record: ICase) =>
              //   assignedToMatches(filterWord, record.assignedTo)
              // }
            />
            <Column
              title="Created (UTC)"
              key="created_at"
              // sorter={(a: ICase, b: ICase) =>
              //   a.createdAt.localeCompare(b.createdAt)
              // }
              render={(value, theCase, index) =>
                formatISO8601((theCase as ICase).createdAt)
              }
            />
            <Column
              title="Tasks"
              key="tasks"
              render={(value, theCase: ICase, index) => (
                <TaskProgress
                  completedTaskCount={theCase.completedTaskCount}
                  totalTaskCount={theCase.totalTaskCount}
                />
              )}
            />
          </Table>
        );
      }
    }
  )
);
