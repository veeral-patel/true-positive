import { Button, Form, Input } from "antd";
import GenericEditor from "container/shared/markdown/GenericEditor";
import StatusSelect from "container/shared/statuses/StatusSelect";
import React from "react";

interface Props {
  handleClose: () => void;
}

function CaseTemplateForm({ handleClose }: Props) {
  return (
    <Form colon={false} layout="vertical">
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message:
              "Please provide a default name for cases created with this template"
          }
        ]}
      >
        <Input placeholder="Your case's name" />
      </Form.Item>
      <Form.Item
        label="Status"
        name="status"
        rules={[
          {
            required: true,
            message:
              "Please provide a default status for cases created with this template"
          }
        ]}
      >
        <StatusSelect />
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

export default CaseTemplateForm;
