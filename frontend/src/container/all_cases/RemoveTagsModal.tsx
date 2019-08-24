import { Alert, Modal, Select, Typography } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import CaseStore from "stores/AllCasesStore";
import UIStore from "stores/UIStore";

const { Paragraph } = Typography;

interface IRemoveTagsModalProps {
  uiStore?: UIStore;
  allCasesStore?: CaseStore;
}

export default inject("uiStore", "allCasesStore")(
  observer(
    class RemoveTagsModal extends React.Component<IRemoveTagsModalProps> {
      render() {
        const { uiStore, allCasesStore } = this.props;
        return (
          <Modal
            title={`Remove Tags from ${
              allCasesStore!.numberOfSelectedCases
            } Case(s)`}
            visible={uiStore!.openModal === "REMOVE_TAGS_FROM_CASE_MODAL"}
            onOk={this.handleRemoveTags.bind(this)}
            onCancel={() => uiStore!.closeModal()}
            okText="Remove Tags"
          >
            <Alert
              message="If a selected case doesn't have all of the tags below, it's fine! We'll just remove the tags below that it does have."
              type="info"
              showIcon
            />
            <br />
            <Paragraph>
              Simply type in the tags you'd like to remove from all of the
              selected case(s).
            </Paragraph>
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Enter tags"
            />
          </Modal>
        );
      }

      handleRemoveTags() {
        const { uiStore, allCasesStore } = this.props;
        allCasesStore!.removeTagsFromSelectedCases();
        uiStore!.closeModal();
      }
    }
  )
);
