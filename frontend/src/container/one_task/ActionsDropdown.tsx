import { navigate } from "@reach/router";
import { ClickParam } from "antd/lib/menu";
import { inject, observer } from "mobx-react";
import ActionsDropdownP from "presentational/one_task/ActionsDropdownP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import { DELETE_TASK } from "utils/constants";
import { getPathToCaseTasks } from "utils/pathHelpers";

interface ActionsDropdownProps {
  activeCaseStore?: ActiveCaseStore;
  taskId: number;
  caseId: number;
}

export default inject("activeCaseStore")(
  observer(
    class ActionsDropdown extends React.Component<ActionsDropdownProps> {
      render() {
        return (
          <ActionsDropdownP handleMenuClick={this.handleMenuClick.bind(this)} />
        );
      }

      handleMenuClick(click: ClickParam) {
        const { activeCaseStore, taskId, caseId } = this.props;
        if (click.key === DELETE_TASK) {
          activeCaseStore!.deleteTask(taskId);
          navigate(getPathToCaseTasks(caseId));
        }
      }
    }
  )
);
