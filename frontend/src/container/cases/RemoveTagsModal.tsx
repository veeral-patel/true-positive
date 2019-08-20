import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import CaseStore from "stores/CaseStore";
import UIStore from "stores/UIStore";

interface IRemoveTagsModalProps {
  uiStore?: UIStore;
  caseStore?: CaseStore;
}

export default inject("uiStore", "caseStore")(
  observer(
    class RemoveTagsModal extends React.Component<IRemoveTagsModalProps> {
      render() {
        const { uiStore, caseStore } = this.props;
        return (
          <Modal
            title={`Remove Tags from ${caseStore!.numberOfSelectedCases} Cases`}
            visible={uiStore!.openModal === "REMOVE_TAGS_FROM_CASE_MODAL"}
          />
        );
      }
    }
  )
);
