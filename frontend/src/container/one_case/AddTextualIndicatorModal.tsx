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
        okText="Add indicator"
        visible={visible}
        onCancel={() => handleClose()}
      >
        Examples of textual indicators include Snort rules and Yara signatures.
      </Modal>
    );
  }
}

export default AddTextualIndicatorModal;
