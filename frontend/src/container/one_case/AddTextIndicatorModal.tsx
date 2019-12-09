import { Button, Form, Input, Modal, Typography } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

const { TextArea } = Input;
const { Paragraph } = Typography;

// -----

interface FormProps {
  handleClose: () => void;
  activeCaseStore?: ActiveCaseStore;
}

// Don't use this form directly
const AddIndicatorForm = inject("activeCaseStore")(
  observer(
    class InnerForm extends React.Component<FormProps> {
      render() {
        const { handleClose, activeCaseStore } = this.props;

        return (
          <Form
            colon={false}
            layout="vertical"
            onFinish={values => {
              if (activeCaseStore!.activeCase) {
                activeCaseStore!.createTextIndicator(
                  activeCaseStore!.activeCase.id,
                  values.name,
                  values.indicator
                );
              }
            }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please name your indicator" }
              ]}
            >
              <Input placeholder="Name your indicator" />
            </Form.Item>
            <Form.Item
              label="Indicator"
              name="indicator"
              rules={[
                { required: true, message: "Please enter your indicator" }
              ]}
            >
              <TextArea placeholder="Enter your indicator here" rows={5} />
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
    }
  )
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
