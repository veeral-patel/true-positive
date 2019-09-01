import { Table } from "antd";
import { ColumnFilterItem } from "antd/lib/table";
import { inject, observer } from "mobx-react";
import CasesTableP from "presentational/all_cases/CasesTableP";
import React from "react";
import CaseStore from "stores/AllCasesStore";
import StatusStore from "stores/StatusStore";
import ICase from "ts/interfaces/ICase";

interface ICasesTableProps {
  allCasesStore?: CaseStore;
  statusStore?: StatusStore;
}

export default inject("allCasesStore", "statusStore")(
  observer(
    class CasesTable extends React.Component<ICasesTableProps> {
      componentDidMount() {
        const { allCasesStore, statusStore } = this.props;
        allCasesStore!.loadCases();
        statusStore!.loadStatuses();
      }

      render() {
        const { allCasesStore, statusStore } = this.props;
        const rowSelection = {
          onChange: (
            selectedRowKeys: string[] | number[],
            selectedRows: ICase[]
          ) => {
            allCasesStore!.setSelectedCases(selectedRows);
          },
          selectedRows: allCasesStore!.selectedCases
        };

        if (allCasesStore!.casesAreLoading || statusStore!.statusesAreLoading) {
          return <Table loading={true} />;
        } else {
          const statuses = statusStore!.statuses;
          let statusFilters: ColumnFilterItem[] = [];

          if (statuses) {
            statusFilters = statuses.map(status => ({
              text: status.name,
              value: status.name
            }));
          }

          return (
            <CasesTableP
              dataSource={allCasesStore!.filteredCases}
              rowSelection={rowSelection}
              statusFilters={statusFilters}
            />
          );
        }
      }
    }
  )
);
