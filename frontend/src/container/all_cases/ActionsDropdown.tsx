import { ClickParam } from "antd/lib/menu";
import { inject, observer } from "mobx-react";
import ActionsDropdownP from "presentational/all_cases/ActionsDropdownP";
import React from "react";
import AllCasesStore from "stores/AllCasesStore";
import UIStore from "stores/UIStore";
import {
  ADD_COMMENT_TO_CASE,
  ADD_TAGS,
  ASSIGN_CASES_MODAL,
  CHANGE_PRIORITY,
  CHANGE_STATUS,
  MERGE_CASES_MODAL,
  REMOVE_TAGS
} from "utils/constants";

interface IActionsDropdownProps {
  allCasesStore?: AllCasesStore;
  uiStore?: UIStore;
}

export default inject("allCasesStore", "uiStore")(
  observer(
    class ActionsDropdown extends React.Component<IActionsDropdownProps> {
      render() {
        const { allCasesStore } = this.props;
        return (
          <ActionsDropdownP
            numberOfSelectedCases={allCasesStore!.numberOfSelectedCases}
            handleMenuClick={this.handleMenuClick.bind(this)}
          />
        );
      }

      handleMenuClick(click: ClickParam) {
        const { uiStore } = this.props;
        if (click.key === ADD_TAGS) {
          uiStore!.openAddTagsToCaseModal();
        } else if (click.key === REMOVE_TAGS) {
          uiStore!.openRemoveTagsFromCaseModal();
        } else if (click.key === CHANGE_STATUS) {
          uiStore!.openChangeCaseStatusModal();
        } else if (click.key === CHANGE_PRIORITY) {
          uiStore!.openChangeCasePriorityModal();
        } else if (click.key === ADD_COMMENT_TO_CASE) {
          uiStore!.openAddCommentToCaseModal();
        } else if (click.key === MERGE_CASES_MODAL) {
          uiStore!.openMergeCasesModal();
        } else if (click.key === ASSIGN_CASES_MODAL) {
          uiStore!.openAssignCasesModal();
        }
      }
    }
  )
);
