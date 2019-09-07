import { Alert, Modal, Typography } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import UIStore from "stores/UIStore";

const { Paragraph, Text } = Typography;

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
          >
            <Alert
              type="info"
              showIcon
              message="Merging this case will simply mark this case as merged. It will
              not modify this case, its indicators, or its tasks at all."
            />
            <div style={{ marginTop: "8px" }}>
              <Paragraph>Choose a case to merge this case into:</Paragraph>
            </div>
          </Modal>
        );
      }
    }
  )
);
