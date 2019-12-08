import { DownOutlined } from "@ant-design/icons";
import { navigate } from "@reach/router";
import { Button, Dropdown, Modal } from "antd";
import Menu, { ClickParam } from "antd/lib/menu";
import { inject, observer } from "mobx-react";
import React from "react";
import AllCasesStore from "stores/AllCasesStore";
import UIStore from "stores/UIStore";
import { DELETE_CASE, MERGE_CASE, paths } from "utils/constants";

interface ActionsDropdownProps {
  allCasesStore?: AllCasesStore;
  uiStore?: UIStore;
  caseId: number;
}

export default inject(
  "allCasesStore",
  "uiStore"
)(
  observer(
    class ActionsDropdown extends React.Component<ActionsDropdownProps> {
      render() {
        const menu = (
          <Menu onClick={this.handleMenuClick.bind(this)}>
            <Menu.Item key={MERGE_CASE}>Merge</Menu.Item>
            <Menu.Divider />
            <Menu.Item key={DELETE_CASE} style={{ color: "red" }}>
              Delete Case
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
            "Delete this case? This will delete its indicators and tasks (but not its merged cases).",
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
