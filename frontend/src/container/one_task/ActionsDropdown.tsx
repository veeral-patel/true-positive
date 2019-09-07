import { ClickParam } from "antd/lib/menu";
import { inject, observer } from "mobx-react";
import ActionsDropdownP from "presentational/one_task/ActionsDropdownP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import { DELETE_TASK } from "utils/constants";

interface ActionsDropdownProps {
  activeCaseStore?: ActiveCaseStore;
  taskId: number;
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
        const { activeCaseStore, taskId } = this.props;
        if (click.key === DELETE_TASK) {
          activeCaseStore!.deleteTask(taskId);
        }
      }
    }
  )
);
