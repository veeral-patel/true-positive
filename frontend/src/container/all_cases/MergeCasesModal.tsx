import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import CaseStore from "stores/AllCasesStore";
import UIStore from "stores/UIStore";

interface MergeCasesModalProps {
  uiStore?: UIStore;
  allCasesStore?: CaseStore;
}

export default inject("uiStore", "allCasesStore")(
  observer(
    class MergeCasesModal extends React.Component<MergeCasesModalProps> {
      render() {
        const { uiStore, allCasesStore } = this.props;
        return (
          <Modal
            title={`Merge ${
              allCasesStore!.numberOfSelectedCases
            } Case(s) into Another Case`}
            visible={uiStore!.openModal === "MERGE_CASES_MODAL"}
            onCancel={() => uiStore!.closeModal()}
            okText="Merge"
          />
        );
      }
    }
  )
);
