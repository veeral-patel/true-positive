import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import Menu, { ClickParam } from "antd/lib/menu";
import { inject, observer } from "mobx-react";
import React from "react";
import AllCasesStore from "stores/AllCasesStore";
import UIStore from "stores/UIStore";
import { DELETE_CASE, MERGE_CASE } from "utils/constants";
import DeleteCaseModal from "./DeleteCaseModal";

interface Props {
  allCasesStore?: AllCasesStore;
  uiStore?: UIStore;
  caseId: number;
}

interface State {
  openModal: "DELETE_CASE_MODAL" | null;
}

export default inject(
  "allCasesStore",
  "uiStore"
)(
  observer(
    class ActionsDropdown extends React.Component<Props, State> {
      constructor(props: Props) {
        super(props);
        this.state = {
          openModal: "DELETE_CASE_MODAL"
        };
      }

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

        const { openModal } = this.state;

        return (
          <>
            <Dropdown overlay={menu}>
              <Button>
                Actions <DownOutlined />
              </Button>
            </Dropdown>
            <DeleteCaseModal visible={openModal === "DELETE_CASE_MODAL"} />
          </>
        );
      }

      handleMenuClick(click: ClickParam) {
        if (click.key === DELETE_CASE) {
          this.deleteCase();
        } else if (click.key === MERGE_CASE) {
          this.mergeCase();
        }
      }

      deleteCase() {}

      mergeCase() {
        const { uiStore } = this.props;
        uiStore!.openMergeOneCaseModal();
      }
    }
  )
);
