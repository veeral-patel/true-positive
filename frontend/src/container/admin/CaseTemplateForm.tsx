import { Form, Input } from "antd";
import React from "react";

interface Props {}

function CaseTemplateForm(props: Props) {
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
    </Form>
  );
}

export default CaseTemplateForm;
