import { DownOutlined } from "@ant-design/icons";
import { navigate } from "@reach/router";
import { Button, Dropdown, Menu, Modal } from "antd";
import { ClickParam } from "antd/lib/menu";
import { inject, observer } from "mobx-react";
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
        const menu = (
          <Menu onClick={this.handleMenuClick.bind(this)}>
            <Menu.Item key={DELETE_TASK} style={{ color: "red" }}>
              Delete Task
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu}>
            <Button>
              Actions <DownOutlined />
            </Button>
          </Dropdown>
        );
      }

      handleMenuClick(click: ClickParam) {
        if (click.key === DELETE_TASK) {
          this.deleteTask();
        }
      }

      deleteTask() {
        const { activeCaseStore, taskId, caseId } = this.props;
        Modal.confirm({
          title: "Delete task?",
          content: "Are you sure you want to delete this task?",
          onOk() {
            activeCaseStore!.deleteTask(taskId);
            navigate(getPathToCaseTasks(caseId));
          },
          onCancel() {}
        });
      }
    }
  )
);
