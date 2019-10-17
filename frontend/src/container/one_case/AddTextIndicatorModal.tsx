import { Form, Input, Modal, Typography } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import React from "react";

const { TextArea } = Input;
const { Paragraph } = Typography;

// -----

interface FormProps {
  form: WrappedFormUtils;
}

// Don't use this form directly
class DumbAddIndicatorForm extends React.Component<FormProps> {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Form.Item label="Name">
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Please name your indicator" }]
          })(<Input placeholder="Name your indicator" />)}
        </Form.Item>
        <Form.Item label="Indicator">
          {getFieldDecorator("indicator", {
            rules: [{ required: true, message: "Please enter your indicator" }]
          })(<TextArea placeholder="Enter your indicator here" rows={5} />)}
        </Form.Item>
      </Form>
    );
  }
}

// -----

// Use this form instead
const AddIndicatorForm = Form.create()(DumbAddIndicatorForm);

// -----

interface ModalProps {
  visible: boolean;
  handleClose: () => void;
}

class AddTextIndicatorModal extends React.Component<ModalProps> {
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
        <AddIndicatorForm />
      </Modal>
    );
  }
}

export default AddTextIndicatorModal;
