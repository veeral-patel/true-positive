import { Alert, Modal, Select, Typography } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import CaseStore from "stores/AllCasesStore";
import UIStore from "stores/UIStore";

const { Paragraph } = Typography;

interface Props {
  uiStore?: UIStore;
  allCasesStore?: CaseStore;
}

export default inject("uiStore", "allCasesStore")(
  observer(
    class AddTagsModal extends React.Component<Props> {
      render() {
        const { uiStore, allCasesStore } = this.props;
        return (
          <Modal
            title={`Add Tags to ${
              allCasesStore!.numberOfSelectedCases
            } Case(s)`}
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
              Simply type in the tags you'd like to add to all of the selected
              case(s).
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
        const { uiStore, allCasesStore } = this.props;
        allCasesStore!.addTagsToSelectedCases();
        uiStore!.closeModal();
      }
    }
  )
);
