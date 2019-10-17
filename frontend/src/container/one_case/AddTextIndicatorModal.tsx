import { Button, Form, Input, Modal, Typography } from "antd";
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
      <Form colon={false}>
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
        <Form.Item>
          <div style={{ float: "right" }}>
            <Button style={{ marginRight: "0.5em" }}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Add indicator
            </Button>
          </div>
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
        visible={visible}
        title="Add a text indicator"
        footer={null}
        onCancel={handleClose}
        destroyOnClose={true}
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
