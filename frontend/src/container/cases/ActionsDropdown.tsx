import { ClickParam } from "antd/lib/menu";
import { inject, observer } from "mobx-react";
import ActionsDropdownP from "presentational/cases/ActionsDropdownP";
import React from "react";
import CaseStore from "stores/CaseStore";
import UIStore from "stores/UIStore";

interface IActionsDropdownProps {
  caseStore?: CaseStore;
  uiStore?: UIStore;
}

export default inject("caseStore", "uiStore")(
  observer(
    class ActionsDropdown extends React.Component<IActionsDropdownProps> {
      render() {
        const { caseStore } = this.props;
        return (
          <ActionsDropdownP
            numberOfSelectedCases={caseStore!.numberOfSelectedCases}
            handleMenuClick={this.handleMenuClick.bind(this)}
          />
        );
      }

      handleMenuClick(click: ClickParam) {
        const { uiStore } = this.props;
        if (click.key === "add_tags") {
          uiStore!.openAddTagsToCaseModal();
        }
      }
    }
  )
);
