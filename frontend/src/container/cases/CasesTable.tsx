import { notification, Table } from "antd";
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
        if (this.props.caseStore) {
          this.props.caseStore.loadCases();
        } else {
          notification.error({
            message: "An error occurred while fetching cases",
            description: "caseStore is undefined"
          });
        }
      }

      render() {
        if (this.props.caseStore) {
          if (this.props.caseStore.casesAreLoading)
            return <Table loading={true} />;
          else return <CasesTableP dataSource={this.props.caseStore.cases} />;
        }
        return <h3>An error occurred: caseStore is undefined</h3>;
      }
    }
  )
);
