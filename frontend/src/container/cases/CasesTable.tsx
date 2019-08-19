import { Table } from "antd";
import { inject, observer } from "mobx-react";
import CasesTableP from "presentational/cases/CasesTableP";
import React from "react";
import CaseStore from "stores/CaseStore";

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
        if (caseStore!.casesAreLoading) return <Table loading={true} />;
        else return <CasesTableP dataSource={caseStore!.cases} />;
      }
    }
  )
);
