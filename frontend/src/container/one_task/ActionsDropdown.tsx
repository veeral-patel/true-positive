import { inject, observer } from "mobx-react";
import ActionsDropdownP from "presentational/one_task/ActionsDropdownP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

interface ActionsDropdownProps {
  allCasesStore?: ActiveCaseStore;
}

export default inject("activeCaseStore")(
  observer(
    class ActionsDropdown extends React.Component<ActionsDropdownProps> {
      render() {
        return <ActionsDropdownP />;
      }
    }
  )
);
