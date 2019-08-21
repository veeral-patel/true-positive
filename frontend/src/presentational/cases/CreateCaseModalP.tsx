import { Form, Input, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "presentational/cases/CreateCaseModalP.css";
import React from "react";

const { Option } = Select;

interface ICreateCaseModalProps {
  visible: boolean;
  handleOk: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  handleCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const CreateCaseModalP: React.FC<ICreateCaseModalProps> = ({
  visible,
  handleOk,
  handleCancel
}) => (
  <Modal
    visible={visible}
    title="Create a Case"
    onOk={handleOk}
    onCancel={handleCancel}
    okText="Create Case"
    style={{ padding: "0px" }}
  >
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
  </Modal>
);

export default CreateCaseModalP;
