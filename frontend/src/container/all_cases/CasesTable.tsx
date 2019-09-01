import { Table } from "antd";
import { ColumnFilterItem } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import CasesTableP from "presentational/all_cases/CasesTableP";
import React from "react";
import CaseStore from "stores/AllCasesStore";
import PriorityStore from "stores/PriorityStore";
import StatusStore from "stores/StatusStore";
import TagStore from "stores/TagStore";
import UserStore from "stores/UserStore";
import ICase from "ts/interfaces/ICase";

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
  "userStore",
  "tagStore"
)(
  observer(
    class CasesTable extends React.Component<ICasesTableProps> {
      componentDidMount() {
        const {
          allCasesStore,
          statusStore,
          priorityStore,
          userStore,
          tagStore
        } = this.props;
        allCasesStore!.loadCases();
        statusStore!.loadStatuses();
        priorityStore!.loadPriorities();
        userStore!.loadUsers();
        tagStore!.loadTags();
      }

      render() {
        const {
          allCasesStore,
          statusStore,
          priorityStore,
          userStore,
          tagStore
        } = this.props;
        const rowSelection = {
          onChange: (
            selectedRowKeys: string[] | number[],
            selectedRows: ICase[]
          ) => {
            allCasesStore!.setSelectedCases(selectedRows);
          },
          selectedRows: allCasesStore!.selectedCases
        };

        if (
          allCasesStore!.casesAreLoading ||
          statusStore!.statusesAreLoading ||
          priorityStore!.prioritiesAreLoading ||
          userStore!.usersAreLoading ||
          tagStore!.tagsAreLoading
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

        // populate tag filter options
        const tags = tagStore!.tags;
        let tagFilters: ColumnFilterItem[] = [];

        if (tags) {
          tagFilters = tags.map(tag => ({
            text: tag.name,
            value: tag.name
          }));
        }

        return (
          <CasesTableP
            dataSource={allCasesStore!.filteredCases}
            rowSelection={rowSelection}
            statusFilters={statusFilters}
            priorityFilters={priorityFilters}
            userFilters={userFilters}
            tagFilters={tagFilters}
          />
        );
      }
    }
  )
);
