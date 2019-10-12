import { navigate } from "@reach/router";
import { Spin, Table } from "antd";
import { ColumnFilterItem } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import PriorityTagP from "presentational/shared/tags/PriorityTagP";
import StatusTagP from "presentational/shared/tags/StatusTagP";
import React from "react";
import CaseStore from "stores/AllCasesStore";
import PriorityStore from "stores/PriorityStore";
import StatusStore from "stores/StatusStore";
import TagStore from "stores/TagStore";
import UserStore from "stores/UserStore";
import ICase from "ts/interfaces/ICase";
import ITag from "ts/interfaces/ITag";
import compareUsers from "utils/compareUsers";
import { paths } from "utils/constants";
import formatISO8601 from "utils/formatISO8601";
import {
  assignedToMatches,
  createdByMatches,
  priorityMatches,
  statusMatches
} from "utils/matchesFilter";

const { Column } = Table;

interface ICasesTableProps {
  allCasesStore?: CaseStore;
  statusStore?: StatusStore;
  priorityStore?: PriorityStore;
  userStore?: UserStore;
  tagStore?: TagStore;
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
          userStore,
          tagStore
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
          <Table
            dataSource={allCasesStore!.filteredCases}
            rowKey={theCase => theCase.id.toString()}
            onRowClick={(clickedCase, index, event) =>
              navigate(`${paths.CASES_PATH}/${clickedCase.id}`)
            }
          >
            <Column
              title="Name"
              dataIndex="name"
              key="name"
              sorter={(a: ICase, b: ICase) => a.name.localeCompare(b.name)}
            />
            <Column
              title="Tags"
              dataIndex="tags"
              key="tags"
              render={(tags: ITag[]) => (
                <div style={{ lineHeight: 2.0 }}>
                  <ListOfTagsP tags={tags} limit={3} />
                </div>
              )}
            />
            <Column
              title="Status"
              dataIndex="status.name"
              key="status"
              render={(statusName: string) => (
                <StatusTagP statusName={statusName} />
              )}
              sorter={(a: ICase, b: ICase) =>
                a.status.name.localeCompare(b.status.name)
              }
              filters={statusFilters}
              onFilter={(filterWord, record) =>
                statusMatches(filterWord, record.status)
              }
            />
            <Column
              title="Priority"
              dataIndex="priority.name"
              key="priority"
              render={(priorityName: string) => (
                <PriorityTagP priorityName={priorityName} />
              )}
              sorter={(a: ICase, b: ICase) =>
                a.priority.name.localeCompare(b.priority.name)
              }
              filters={priorityFilters}
              onFilter={(filterWord, record) =>
                priorityMatches(filterWord, record.priority)
              }
            />
            <Column
              title="Assigned To"
              dataIndex="assignedTo.username"
              key="assigned_to"
              sorter={(a: ICase, b: ICase) =>
                compareUsers(a.assignedTo, b.assignedTo)
              }
              filters={userFilters}
              onFilter={(filterWord, record) =>
                assignedToMatches(filterWord, record.assignedTo)
              }
            />
            <Column
              title="Created By"
              dataIndex="createdBy.username"
              key="created_by"
              sorter={(a: ICase, b: ICase) =>
                compareUsers(a.createdBy, b.createdBy)
              }
              filters={userFilters}
              onFilter={(filterWord, record) =>
                createdByMatches(filterWord, record.createdBy)
              }
            />
            <Column
              title="Created At (UTC)"
              dataIndex="createdAt"
              key="created_at"
              sorter={(a: ICase, b: ICase) =>
                a.createdAt.localeCompare(b.createdAt)
              }
              render={(text, theCase, index) =>
                formatISO8601(theCase.createdAt)
              }
            />
          </Table>
        );
      }
    }
  )
);
