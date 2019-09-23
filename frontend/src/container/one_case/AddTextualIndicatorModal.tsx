import { Modal } from "antd";
import React from "react";

interface Props {
  visible: boolean;
  handleClose: () => void;
}

class AddTextualIndicatorModal extends React.Component<Props> {
  render() {
    const { visible, handleClose } = this.props;
    return (
      <Modal
        title="Add a textual indicator"
        visible={visible}
        onCancel={() => handleClose()}
      ></Modal>
    );
  }
}

export default AddTextualIndicatorModal;
