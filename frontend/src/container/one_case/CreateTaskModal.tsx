import { Button, Form, Input, Modal, Select } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import "container/shared/modals/FormInModal.css";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import PriorityStore from "stores/PriorityStore";
import StatusStore from "stores/StatusStore";
import UIStore from "stores/UIStore";

const { Option } = Select;

// -----

interface FormProps {
  form: WrappedFormUtils;
  statusStore?: StatusStore;
  priorityStore?: PriorityStore;
  activeCaseStore?: ActiveCaseStore;
}

class DumbCreateTaskForm extends React.Component<FormProps> {
  componentDidMount() {
    const { statusStore, priorityStore } = this.props;
    statusStore!.loadStatuses();
    priorityStore!.loadPriorities();
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // prevent page reload
    event.preventDefault();

    // validate our fields and raise errors if needed
    const { form, activeCaseStore } = this.props;
    form.validateFields((errors, values) => {
      if (activeCaseStore!.activeCase) {
        activeCaseStore!.createTask(
          values.name,
          values.status,
          values.priority,
          activeCaseStore!.activeCase.id
        );
      }
    });
  }

  render() {
    const { statusStore, priorityStore } = this.props;
    const { getFieldDecorator } = this.props.form;

    const statusOptions = statusStore!.statuses.map(status => (
      <Option key={status.name}>{status.name}</Option>
    ));

    const priorityOptions = priorityStore!.priorities.map(priority => (
      <Option key={priority.name}>{priority.name}</Option>
    ));

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
        <Form.Item label="Status">
          {getFieldDecorator("status", {
            rules: [{ required: true, message: "Please choose a status" }]
          })(
            <Select
              showSearch
              placeholder="Choose a status"
              style={{ minWidth: "200px" }}
            >
              {statusOptions}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Priority">
          {getFieldDecorator("priority", {
            rules: [{ required: true, message: "Please choose a priority" }]
          })(
            <Select
              showSearch
              placeholder="Choose a priority"
              style={{ minWidth: "200px" }}
            >
              {priorityOptions}
            </Select>
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
  inject("statusStore", "priorityStore", "activeCaseStore")(
    observer(DumbCreateTaskForm)
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
