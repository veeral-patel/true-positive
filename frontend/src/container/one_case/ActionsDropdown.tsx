import { navigate } from "@reach/router";
import { Modal } from "antd";
import { ClickParam } from "antd/lib/menu";
import { inject, observer } from "mobx-react";
import ActionsDropdownP from "presentational/one_case/InfoP/ActionsDropdownP";
import React from "react";
import AllCasesStore from "stores/AllCasesStore";
import UIStore from "stores/UIStore";
import { DELETE_CASE, MERGE_CASE, paths } from "utils/constants";

interface ActionsDropdownProps {
  allCasesStore?: AllCasesStore;
  uiStore?: UIStore;
  caseId: number;
}

export default inject("allCasesStore", "uiStore")(
  observer(
    class ActionsDropdown extends React.Component<ActionsDropdownProps> {
      render() {
        return (
          <ActionsDropdownP handleMenuClick={this.handleMenuClick.bind(this)} />
        );
      }

      handleMenuClick(click: ClickParam) {
        if (click.key === DELETE_CASE) {
          this.deleteCase();
        } else if (click.key === MERGE_CASE) {
          this.mergeCase();
        }
      }

      deleteCase() {
        const { allCasesStore, caseId } = this.props;
        Modal.confirm({
          title: "Delete case?",
          content:
            "Are you sure you want to delete this case? This will delete all of its indicators and tasks, too.",
          onOk() {
            allCasesStore!.deleteCase(caseId);
            navigate(paths.CASES_PATH);
          },
          onCancel() {}
        });
      }

      mergeCase() {
        const { uiStore } = this.props;
        uiStore!.openMergeOneCaseModal();
      }
    }
  )
);
