import { Table } from "antd";
import { inject, observer } from "mobx-react";
import CasesTableP from "presentational/all_cases/CasesTableP";
import React from "react";
import CaseStore from "stores/AllCasesStore";
import ICase from "ts/interfaces/ICase";

interface ICasesTableProps {
  allCasesStore?: CaseStore;
}

export default inject("allCasesStore")(
  observer(
    class CasesTable extends React.Component<ICasesTableProps> {
      componentDidMount() {
        const { allCasesStore } = this.props;
        allCasesStore!.loadCases();
      }

      render() {
        const { allCasesStore } = this.props;
        const rowSelection = {
          onChange: (
            selectedRowwKeys: string[] | number[],
            selectedRows: ICase[]
          ) => {
            allCasesStore!.setSelectedCases(selectedRows);
          },
          selectedRows: allCasesStore!.selectedCases
        };

        if (allCasesStore!.casesAreLoading) return <Table loading={true} />;
        else
          return (
            <CasesTableP
              dataSource={allCasesStore!.filteredCases}
              rowSelection={rowSelection}
            />
          );
      }
    }
  )
);
