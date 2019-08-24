import { Modal } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import CaseStore from "stores/AllCasesStore";
import UIStore from "stores/UIStore";

interface AddCommentToCaseModalProps {
  uiStore?: UIStore;
  allCasesStore?: CaseStore;
}

export default inject("uiStore", "allCasesStore")(
  observer(
    class AddCommentToCaseModal extends React.Component<
      AddCommentToCaseModalProps
    > {
      render() {
        const { uiStore, allCasesStore } = this.props;
        return (
          <Modal
            title={`Add a Comment to ${
              allCasesStore!.numberOfSelectedCases
            } Cases`}
            visible={uiStore!.openModal === "ADD_COMMENT_TO_CASE"}
            onCancel={() => uiStore!.closeModal()}
            okText="Add Comment"
          />
        );
      }
    }
  )
);
