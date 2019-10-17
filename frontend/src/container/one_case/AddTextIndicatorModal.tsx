import { Button, Form, Input, Modal, Typography } from "antd";
import { FormComponentProps, WrappedFormUtils } from "antd/lib/form/Form";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

const { TextArea } = Input;
const { Paragraph } = Typography;

// -----

interface FormProps {
  form: WrappedFormUtils;
  handleClose: () => void;
  activeCaseStore?: ActiveCaseStore;
}

// Don't use this form directly
class DumbAddIndicatorForm extends React.Component<
  FormProps & FormComponentProps
> {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { handleClose } = this.props;

    return (
      <Form colon={false} onSubmit={this.handleSubmit.bind(this)}>
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
            <Button style={{ marginRight: "0.5em" }} onClick={handleClose}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Add indicator
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // prevent page reload
    event.preventDefault();

    // validate our fields and raise errors if needed
    const { form, activeCaseStore } = this.props;
    form.validateFields((errors, values) => {
      if (!errors && activeCaseStore!.activeCase) {
        activeCaseStore!.createTextIndicator(
          activeCaseStore!.activeCase.id,
          values.name,
          values.indicator
        );
      }
    });
  }
}

// -----

// Use this form instead
const AddIndicatorForm = Form.create<FormProps & FormComponentProps>()(
  inject("activeCaseStore")(observer(DumbAddIndicatorForm))
);

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
        <AddIndicatorForm handleClose={handleClose} />
      </Modal>
    );
  }
}

export default AddTextIndicatorModal;
