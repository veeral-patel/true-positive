import { Table } from "antd";
import { inject, observer } from "mobx-react";
import CasesTableP from "presentational/cases/CasesTableP";
import React from "react";
import CaseStore from "stores/CaseStore";
import ICase from "ts/interfaces/ICase";

interface ICasesTableProps {
  caseStore?: CaseStore;
}

export default inject("caseStore")(
  observer(
    class CasesTable extends React.Component<ICasesTableProps> {
      componentDidMount() {
        const { caseStore } = this.props;
        caseStore!.loadCases();
      }

      render() {
        const { caseStore } = this.props;
        const rowSelection = {
          onChange: (
            selectedRowKeys: string[] | number[],
            selectedRows: ICase[]
          ) => {
            caseStore!.setSelectedCases(selectedRows);
          },
          selectedRows: caseStore!.selectedCases
        };

        if (caseStore!.casesAreLoading) return <Table loading={true} />;
        else
          return (
            <CasesTableP
              dataSource={caseStore!.cases}
              rowSelection={rowSelection}
            />
          );
      }
    }
  )
);
