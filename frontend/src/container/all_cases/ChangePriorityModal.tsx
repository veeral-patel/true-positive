import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import CaseStore from "stores/AllCasesStore";
import UIStore from "stores/UIStore";

interface ChangePriorityModalProps {
  uiStore?: UIStore;
  allCasesStore?: CaseStore;
}

export default inject("uiStore", "allCasesStore")(
  observer(
    class ChangePriorityModal extends React.Component<
      ChangePriorityModalProps
    > {
      render() {
        const { uiStore, allCasesStore } = this.props;
        return (
          <Modal
            title={`Change the Priorities of ${
              allCasesStore!.numberOfSelectedCases
            } Cases`}
            visible={uiStore!.openModal === "CHANGE_CASE_PRIORITY_MODAL"}
            onCancel={() => uiStore!.closeModal()}
            okText="Change Priorities"
          />
        );
      }
    }
  )
);
