import { navigate } from "@reach/router";
import { Button, Dropdown, Icon, Modal } from "antd";
import Menu, { ClickParam } from "antd/lib/menu";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import { DELETE_INDICATOR } from "utils/constants";
import { getPathToCaseIndicators } from "utils/pathHelpers";

interface ActionsDropdownProps {
  activeCaseStore?: ActiveCaseStore;
  indicatorId: number;
  caseId: number;
}

export default inject("activeCaseStore")(
  observer(
    class ActionsDropdown extends React.Component<ActionsDropdownProps> {
      render() {
        const menu = (
          <Menu onClick={this.handleMenuClick.bind(this)}>
            <Menu.Item key={DELETE_INDICATOR} style={{ color: "red" }}>
              Delete Indicator
            </Menu.Item>
          </Menu>
        );
        return (
          <Dropdown overlay={menu}>
            <Button>
              Actions <Icon type="down" />
            </Button>
          </Dropdown>
        );
      }

      handleMenuClick(click: ClickParam) {
        if (click.key === DELETE_INDICATOR) {
          this.deleteTask();
        }
      }

      deleteTask() {
        const { indicatorId, caseId, activeCaseStore } = this.props;
        Modal.confirm({
          title: "Delete indicator?",
          content: "Are you sure you want to delete this indicator?",
          onOk() {
            activeCaseStore!.deleteIndicator(indicatorId);
            navigate(getPathToCaseIndicators(caseId));
          },
          onCancel() {}
        });
      }
    }
  )
);
