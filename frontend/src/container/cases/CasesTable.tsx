import { inject, observer } from "mobx-react";
import React from "react";
import CaseStore from "stores/CaseStore";

interface ICasesTableProps {
  caseStore?: CaseStore;
}

export default inject("caseStore")(
  observer(
    class CasesTable extends React.Component<ICasesTableProps> {
      render() {
        if (this.props.caseStore) {
          this.props.caseStore.loadCases();
        }
        return <h3>Loading cases now!</h3>;
      }
    }
  )
);
