import { Button, Form, Input, Radio } from "antd";
import React from "react";

const CreateCaseForm: React.FC = () => (
  <Form>
    <Form.Item label="Form Layout">
      <Radio.Group defaultValue="horizontal">
        <Radio.Button value="horizontal">Horizontal</Radio.Button>
        <Radio.Button value="vertical">Vertical</Radio.Button>
        <Radio.Button value="inline">Inline</Radio.Button>
      </Radio.Group>
    </Form.Item>
    <Form.Item label="Field A">
      <Input placeholder="input placeholder" />
    </Form.Item>
    <Form.Item label="Field B">
      <Input placeholder="input placeholder" />
    </Form.Item>
    <Form.Item>
      <Button type="primary">Submit</Button>
    </Form.Item>
  </Form>
);

export default CreateCaseForm;
