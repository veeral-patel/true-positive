import { Alert, Form, Input, Modal } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import UIStore from "stores/UIStore";

const { TextArea } = Input;

// ---

// Don't use this form directly
function DumbMergeCaseForm() {
  return (
    <Form colon={false}>
      <Form.Item label="Reason">
        <TextArea placeholder="Describe how the two cases are related" />
      </Form.Item>
    </Form>
  );
}

// ---

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
              not modify this case or the parent case at all."
            />
            <div style={{ marginTop: "1em" }} />
            <DumbMergeCaseForm />
          </Modal>
        );
      }
    }
  )
);
