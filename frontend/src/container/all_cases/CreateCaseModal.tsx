import { AutoComplete, Button, Form, Icon, Input, Modal, Select } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import "container/all_cases/CreateCaseModalP.css";
import { inject, observer } from "mobx-react";
import React from "react";
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
    const { form } = this.props;
    form.validateFields((errors, values) => console.log(errors));
  }

  render() {
    const { uiStore, statusStore, priorityStore, form } = this.props;
    const { getFieldDecorator } = this.props.form;

    const statusOptions = statusStore!.statuses.map(status => (
      <Option key={status.id}>{status.name}</Option>
    ));

    const priorityOptions = priorityStore!.priorities.map(priority => (
      <Option key={priority.id}>{priority.name}</Option>
    ));

    return (
      <Form colon={false} onSubmit={this.handleSubmit.bind(this)}>
        <Form.Item label="Name" required>
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
        <Form.Item label="Status" required>
          <AutoComplete
            dataSource={statusOptions}
            placeholder="Choose a status"
          >
            <Input suffix={<Icon type="down" style={{ color: "gray" }} />} />
          </AutoComplete>
        </Form.Item>
        <Form.Item label="Priority" required>
          <AutoComplete
            dataSource={priorityOptions}
            placeholder="Choose a priority"
          >
            <Input suffix={<Icon type="down" style={{ color: "gray" }} />} />
          </AutoComplete>
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

// provide our form with validation abilities and access to our MobX stores
const CreateCaseForm = Form.create()(
  inject("statusStore", "priorityStore", "uiStore")(
    observer(DumbCreateCaseForm)
  )
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
            style={{ padding: "0px" }}
            destroyOnClose={true}
          >
            <CreateCaseForm />
          </Modal>
        );
      }
    }
  )
);
