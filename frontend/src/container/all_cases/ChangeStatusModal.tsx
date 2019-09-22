import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import CaseStore from "stores/AllCasesStore";
import UIStore from "stores/UIStore";

interface Props {
  uiStore?: UIStore;
  allCasesStore?: CaseStore;
}

export default inject("uiStore", "allCasesStore")(
  observer(
    class ChangeStatusModal extends React.Component<Props> {
      render() {
        const { uiStore, allCasesStore } = this.props;
        return (
          <Modal
            title={`Change the Statuses of ${
              allCasesStore!.numberOfSelectedCases
            } Case(s)`}
            visible={uiStore!.openModal === "CHANGE_CASE_STATUS_MODAL"}
            onCancel={() => uiStore!.closeModal()}
            okText="Change Statuses"
          />
        );
      }
    }
  )
);
