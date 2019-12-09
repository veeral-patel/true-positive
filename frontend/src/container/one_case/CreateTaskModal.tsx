import { Button, Form, Input, Modal } from "antd";
import "container/shared/modals/FormInModal.css";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import UIStore from "stores/UIStore";

// -----

interface FormProps {
  activeCaseStore?: ActiveCaseStore;
}

const CreateTaskForm = inject("activeCaseStore")(
  observer(
    class InnerForm extends React.Component<FormProps> {
      render() {
        const { activeCaseStore } = this.props;

        return (
          <Form
            colon={false}
            layout="vertical"
            onFinish={values => {
              if (activeCaseStore!.activeCase) {
                activeCaseStore!.createTask(
                  values.name,
                  activeCaseStore!.activeCase.id
                );
              }
            }}
          >
            <Form.Item
              label="Name"
              rules={[{ required: true, message: "Please name this task" }]}
            >
              <Input
                placeholder="Image hard drive"
                ref={input => input && input.focus()}
              />
            </Form.Item>
            <Form.Item>
              <div style={{ float: "right" }}>
                <Button type="primary" htmlType="submit">
                  Create Task
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
  uiStore?: UIStore;
  handleClose: () => void;
}

export default inject("uiStore")(
  observer(
    class CreateTaskModal extends React.Component<ModalProps> {
      render() {
        const { visible, handleClose } = this.props;

        return (
          <Modal
            visible={visible}
            title="Create a Task"
            footer={null}
            onCancel={() => handleClose()}
          >
            <CreateTaskForm />
          </Modal>
        );
      }
    }
  )
);
