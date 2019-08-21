import { Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";

const CreateCaseForm: React.FC = () => (
  <Form colon={false}>
    <Form.Item label="Name" required>
      <Input placeholder="Found Ryuk" autoFocus />
    </Form.Item>
    <Form.Item label="Description">
      <TextArea placeholder="Enter description here" rows={5} />
    </Form.Item>
  </Form>
);

export default CreateCaseForm;
