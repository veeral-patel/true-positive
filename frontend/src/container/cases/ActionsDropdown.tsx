import { inject, observer } from "mobx-react";
import ActionsDropdownP from "presentational/cases/ActionsDropdownP";
import React from "react";
import CaseStore from "stores/CaseStore";

interface IFilterInputProps {
  caseStore?: CaseStore;
}

export default inject("caseStore")(
  observer(
    class FilterInput extends React.Component<IFilterInputProps> {
      render() {
        const { caseStore } = this.props;
        return (
          <ActionsDropdownP
            numberOfSelectedCases={caseStore!.numberOfSelectedCases}
          />
        );
      }
    }
  )
);
