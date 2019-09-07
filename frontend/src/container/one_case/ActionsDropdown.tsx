import { Modal } from "antd";
import { ClickParam } from "antd/lib/menu";
import ActionsDropdownP from "presentational/one_case/InfoP/ActionsDropdownP";
import React from "react";
import { DELETE_CASE } from "utils/constants";

class ActionsDropdown extends React.Component {
  render() {
    return (
      <ActionsDropdownP handleMenuClick={this.handleMenuClick.bind(this)} />
    );
  }

  handleMenuClick(click: ClickParam) {
    if (click.key === DELETE_CASE) {
      this.deleteCase();
    }
  }

  deleteCase() {
    Modal.confirm({
      title: "Delete case?",
      content:
        "Are you sure you want to delete this case? This will delete all of its indicators and tasks, too.",
      onOk() {},
      onCancel() {}
    });
  }
}

export default ActionsDropdown;
