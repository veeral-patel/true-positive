import { Button, Form, Input } from "antd";
import GenericEditor from "container/shared/markdown/GenericEditor";
import React from "react";

interface Props {
  handleClose: () => void;
  handleFinish?: (values: any) => void;
  initialValues?: any;
}

// Form used for updating/creating a task template.
function TaskTemplateForm({ handleClose, handleFinish, initialValues }: Props) {
  return (
    <Form
      colon={false}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={initialValues}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message:
              "Please provide a default name for tasks created with this template"
          }
        ]}
      >
        <Input placeholder="Default task name" />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <GenericEditor />
      </Form.Item>
      <Form.Item>
        <div style={{ float: "right", marginTop: "1em" }}>
          <Button style={{ marginRight: "1em" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Update Template
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default TaskTemplateForm;
