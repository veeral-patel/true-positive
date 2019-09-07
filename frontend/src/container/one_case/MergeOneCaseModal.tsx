import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import UIStore from "stores/UIStore";

interface MergeOneCaseModalProps {
  uiStore?: UIStore;
}

export default inject("uiStore")(
  observer(
    class MergeOneCaseModal extends React.Component<MergeOneCaseModalProps> {
      render() {
        const { uiStore } = this.props;
        return (
          <Modal
            title="Merge Case"
            visible={uiStore!.openModal === "MERGE_ONE_CASE_MODAL"}
            onCancel={() => uiStore!.closeModal()}
            okText="Merge"
          />
        );
      }
    }
  )
);
