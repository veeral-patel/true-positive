import { inject, observer } from "mobx-react";
import CaseAutocompleteP from "presentational/shared/cases/CaseAutocompleteP";
import React from "react";
import AllCasesStore from "stores/AllCasesStore";

interface CaseAutocompleteProps {
  allCasesStore?: AllCasesStore;
}

export default inject("allCasesStore")(
  observer(
    class CaseAutocomplete extends React.Component<CaseAutocompleteProps> {
      componentDidMount() {
        const { allCasesStore } = this.props;
        allCasesStore!.loadCases();
      }

      render() {
        const { allCasesStore } = this.props;
        return <CaseAutocompleteP cases={allCasesStore!.cases} />;
      }
    }
  )
);
