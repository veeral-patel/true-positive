import { Icon, Modal, Upload } from "antd";
import React from "react";

const { Dragger } = Upload;

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
      >
        <Dragger>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">
            Drag/drop file(s) into this area to upload them
          </p>
          <p className="ant-upload-hint">Or click to select file(s)</p>
        </Dragger>
      </Modal>
    );
  }
}

export default AddFileIndicatorModal;
