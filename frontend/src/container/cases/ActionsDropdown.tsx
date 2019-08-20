import { inject, observer } from "mobx-react";
import ActionsDropdownP from "presentational/cases/ActionsDropdownP";
import React from "react";
import CaseStore from "stores/CaseStore";

interface IActionsDropdownProps {
  caseStore?: CaseStore;
}

export default inject("caseStore")(
  observer(
    class ActionsDropdown extends React.Component<IActionsDropdownProps> {
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
