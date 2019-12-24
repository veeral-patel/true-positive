import { Button, Form, Input } from "antd";
import GenericEditor from "container/shared/markdown/GenericEditor";
import PrioritySelect from "container/shared/priorities/PrioritySelect";
import StatusSelect from "container/shared/statuses/StatusSelect";
import React from "react";

interface Props {
  handleClose: () => void;
  onFinish?: (values: any) => void;
  submitText: string;
  initialValues?: {
    name: string;
    status: string;
    priority: string;
    description: string;
  };
}

function CaseTemplateForm({
  handleClose,
  onFinish,
  submitText,
  initialValues
}: Props) {
  return (
    <Form
      colon={false}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message:
              "Provide a default name for cases created with this template"
          }
        ]}
      >
        <Input placeholder="Default case name" />
      </Form.Item>
      <Form.Item
        label="Status"
        name="status"
        rules={[
          {
            required: true,
            message:
              "Provide a default status for cases created with this template"
          }
        ]}
      >
        <StatusSelect />
      </Form.Item>
      <Form.Item
        label="Priority"
        name="priority"
        rules={[
          {
            required: true,
            message:
              "Provide a default priority for cases created with this template"
          }
        ]}
      >
        <PrioritySelect />
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
            {submitText}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default CaseTemplateForm;
