import { UploadOutlined } from "@ant-design/icons";
import { Modal, Typography, Upload } from "antd";
import React from "react";

const { Dragger } = Upload;
const { Paragraph } = Typography;

interface Props {
  visible: boolean;
  handleClose: () => void;
}

class AddFileIndicatorModal extends React.Component<Props> {
  render() {
    const { visible, handleClose } = this.props;
    return (
      <Modal
        title="Add file indicator(s)"
        visible={visible}
        onCancel={() => handleClose()}
        okText="Add indicator(s)"
      >
        <Paragraph>
          Examples of file indicators include malware samples, phishing emails,
          and OpenIOC rules.
        </Paragraph>
        <div>
          <Dragger>
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">
              Drag file(s) into this area to upload them
            </p>
            <p className="ant-upload-hint">Or click to select file(s)</p>
          </Dragger>
        </div>
      </Modal>
    );
  }
}

export default AddFileIndicatorModal;
