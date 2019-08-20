import { Alert, message, Modal, Select, Typography } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import CaseStore from "stores/CaseStore";
import UIStore from "stores/UIStore";

const { Paragraph } = Typography;

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
            title={`Add Tags to ${caseStore!.numberOfSelectedCases} Cases`}
            visible={uiStore!.openModal === "ADD_TAGS_TO_CASE_MODAL"}
            onOk={this.handleAddTags.bind(this)}
            onCancel={() => uiStore!.closeModal()}
            okText="Add Tags"
          >
            <Alert
              message="If a selected case already has a tag that you enter, the tag won't be added again to the case."
              type="info"
              showIcon
            />
            <br />
            <Paragraph>
              Simply type in the tags you'd like to add to the selected case(s).
            </Paragraph>
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Enter tags"
            />
          </Modal>
        );
      }

      handleAddTags() {
        // To do: move this code to our store
        const { uiStore, caseStore } = this.props;
        uiStore!.closeModal();
        message.success(
          `Added tags to ${caseStore!.numberOfSelectedCases} cases`
        );
      }
    }
  )
);
