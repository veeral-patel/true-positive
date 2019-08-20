import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import CaseStore from "stores/CaseStore";
import UIStore from "stores/UIStore";

interface IAddTagsModalProps {
  uiStore?: UIStore;
  caseStore?: CaseStore;
}

export default inject("uiStore", "caseStore")(
  observer(
    class AddTagsModal extends React.Component<IAddTagsModalProps> {
      render() {
        const { uiStore, caseStore } = this.props;
        return (
          <Modal
            title={
              "Add Tags to " + caseStore!.numberOfSelectedCases + " Case(s)"
            }
            visible={uiStore!.openModal === "ADD_TAGS_TO_CASE_MODAL"}
            onOk={() => uiStore!.closeModal()}
            onCancel={() => uiStore!.closeModal()}
            okText="Add Tags"
          >
            <p>Some contents here</p>
          </Modal>
        );
      }
    }
  )
);
