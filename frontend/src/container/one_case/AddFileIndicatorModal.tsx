import { Modal } from "antd";
import React from "react";

interface Props {
  visible: boolean;
  handleClose: () => void;
}

class AddFileIndicatorModal extends React.Component<Props> {
  render() {
    const { visible, handleClose } = this.props;
    return (
      <Modal
        title="Add a file indicator"
        visible={visible}
        onCancel={() => handleClose()}
      ></Modal>
    );
  }
}

export default AddFileIndicatorModal;
