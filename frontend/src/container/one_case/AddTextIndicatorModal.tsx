import { Form, Input, Modal, Typography } from "antd";
import React from "react";

const { TextArea } = Input;
const { Paragraph } = Typography;

interface Props {
  visible: boolean;
  handleClose: () => void;
}

class AddTextIndicatorModal extends React.Component<Props> {
  render() {
    const { visible, handleClose } = this.props;
    return (
      <Modal
        title="Add a text indicator"
        okText="Add indicator"
        visible={visible}
        onCancel={handleClose}
      >
        <Paragraph>
          Examples of text indicators include Snort rules, Yara signatures, and
          Exif metadata.
        </Paragraph>
        <Form>
          <Form.Item>
            <Input placeholder="Name your indicator" />
          </Form.Item>
          <Form.Item>
            <TextArea placeholder="Enter indicator here" rows={5} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default AddTextIndicatorModal;
