import { Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "presentational/cases/CreateCaseForm.css";
import React from "react";

const { Option } = Select;

const CreateCaseForm: React.FC = () => (
  <Form colon={false}>
    <Form.Item label="Name" required>
      <Input placeholder="Found Ryuk" />
    </Form.Item>
    <Form.Item label="Status" required>
      <Select
        showSearch
        placeholder="Choose a status"
        optionFilterProp="children"
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
      </Select>
    </Form.Item>
    <Form.Item label="Priority" required>
      <Select
        showSearch
        placeholder="Choose a priority"
        optionFilterProp="children"
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
      </Select>
    </Form.Item>
    <Form.Item label="Tags">
      <Select mode="tags" placeholder="Enter tags" tokenSeparators={[","]} />
    </Form.Item>
    <Form.Item label="Description">
      <TextArea placeholder="Enter description here" rows={5} />
    </Form.Item>
  </Form>
);

export default CreateCaseForm;
