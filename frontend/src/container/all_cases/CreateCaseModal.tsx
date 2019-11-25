import { Button, Form, Input, Modal, Select } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import "container/shared/modals/FormInModal.css";
import { inject, observer } from "mobx-react";
import React from "react";
import AllCasesStore from "stores/AllCasesStore";
import PriorityStore from "stores/PriorityStore";
import StatusStore from "stores/StatusStore";
import UIStore from "stores/UIStore";

const { Option } = Select;

// -----

interface FormProps {
  form: WrappedFormUtils;
  statusStore?: StatusStore;
  priorityStore?: PriorityStore;
  uiStore?: UIStore;
  allCasesStore?: AllCasesStore;
}

class DumbCreateCaseForm extends React.Component<FormProps> {
  componentDidMount() {
    const { statusStore, priorityStore } = this.props;
    statusStore!.loadStatuses();
    priorityStore!.loadPriorities();
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // prevent page reload
    event.preventDefault();

    // validate our fields and raise errors if needed
    const { form, allCasesStore } = this.props;

    form.validateFields((errors, values) => {
      if (!errors) {
        allCasesStore!.createCase(values.name, values.status, values.priority);
      }
    });
  }

  render() {
    const { uiStore, statusStore, priorityStore } = this.props;
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
              { required: true, message: "Please enter a name for this case" }
            ]
          })(
            <Input
              placeholder="Found Ryuk"
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
            <Button
              style={{ marginRight: "0.5em" }}
              onClick={() => uiStore!.closeModal()}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Create Case
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  }
}

// ----

// provide our form with validation and MobX access
const CreateCaseForm = Form.create()(
  inject(
    "statusStore",
    "priorityStore",
    "uiStore",
    "allCasesStore"
  )(observer(DumbCreateCaseForm))
);

// -----

interface ModalProps {
  uiStore?: UIStore;
}

export default inject("uiStore")(
  observer(
    class CreateCaseModal extends React.Component<ModalProps> {
      render() {
        const { uiStore } = this.props;
        return (
          <Modal
            visible={uiStore!.openModal === "CREATE_CASE_MODAL"}
            title="Create a Case"
            footer={null}
            onCancel={() => uiStore!.closeModal()}
            destroyOnClose={true}
            keyboard={false}
          >
            <CreateCaseForm />
          </Modal>
        );
      }
    }
  )
);
