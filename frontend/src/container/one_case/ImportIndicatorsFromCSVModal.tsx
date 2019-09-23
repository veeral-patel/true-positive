import { Modal, Steps } from "antd";
import React from "react";

const { Step } = Steps;

interface Props {
  /* whether this modal is open. */
  visible: boolean;

  /* function to execute when user wants to close this modal */
  handleClose: () => void;
}

class ImportIndicatorsFromCSVModal extends React.Component<Props> {
  render() {
    const { visible, handleClose } = this.props;
    return (
      <Modal
        title="Import indicators from a CSV"
        visible={visible}
        onCancel={() => handleClose()}
        footer={null}
      >
        <Steps size="small">
          <Step title="Choose file" />
          <Step title="Add indicators" />
        </Steps>
      </Modal>
    );
  }
}

export default ImportIndicatorsFromCSVModal;
