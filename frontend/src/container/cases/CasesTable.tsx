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
        }
      }

      render() {
        if (this.props.caseStore) {
          if (this.props.caseStore.casesAreLoading) return <h3>Loading...</h3>;
          else return <CasesTableP dataSource={this.props.caseStore.cases} />;
        }
        return <h3>An error occurred.</h3>;
      }
    }
  )
);
