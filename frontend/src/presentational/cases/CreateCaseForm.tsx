import { Form, Input } from "antd";
import React from "react";

const CreateCaseForm: React.FC = () => (
  <Form colon={false}>
    <Form.Item label="Name" required>
      <Input placeholder="Name" autoFocus />
    </Form.Item>
    <Form.Item label="Field B">
      <Input placeholder="input placeholder" />
    </Form.Item>
  </Form>
);

export default CreateCaseForm;
