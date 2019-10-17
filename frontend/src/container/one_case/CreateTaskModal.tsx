import { Button, Form, Input, Modal } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import "container/shared/modals/FormInModal.css";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import UIStore from "stores/UIStore";

// -----

interface FormProps {
  form: WrappedFormUtils;
  activeCaseStore?: ActiveCaseStore;
}

class DumbCreateTaskForm extends React.Component<FormProps> {
  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // prevent page reload
    event.preventDefault();

    // validate our fields and raise errors if needed
    const { form, activeCaseStore } = this.props;
    form.validateFields((errors, values) => {
      if (!errors && activeCaseStore!.activeCase) {
        activeCaseStore!.createTask(
          values.name,
          activeCaseStore!.activeCase.id
        );
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form colon={false} onSubmit={this.handleSubmit.bind(this)}>
        <Form.Item label="Name">
          {getFieldDecorator("name", {
            rules: [
              { required: true, message: "Please enter a name for this task" }
            ]
          })(
            <Input
              placeholder="Image hard drive"
              ref={input => input && input.focus()}
            />
          )}
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

// ----

// provide our form with validation abilities and access to our MobX stores
const CreateTaskForm = Form.create()(
  inject("activeCaseStore")(observer(DumbCreateTaskForm))
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
