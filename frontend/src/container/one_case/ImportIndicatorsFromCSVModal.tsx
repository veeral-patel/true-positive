import { Modal } from "antd";
import React from "react";

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
      ></Modal>
    );
  }
}

export default ImportIndicatorsFromCSVModal;
