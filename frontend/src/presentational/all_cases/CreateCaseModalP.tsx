import { AutoComplete, Form, Icon, Input, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "presentational/all_cases/CreateCaseModalP.css";
import React from "react";
import IPriority from "ts/interfaces/IPriority";
import IStatus from "ts/interfaces/IStatus";

const { Option } = Select;

interface ICreateCaseModalProps {
  visible: boolean;
  handleOk: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  handleCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  statuses: IStatus[];
  priorities: IPriority[];
}

const CreateCaseModalP: React.FC<ICreateCaseModalProps> = ({
  visible,
  handleOk,
  handleCancel,
  statuses,
  priorities
}) => {
  const statusOptions = statuses.map(status => (
    <Option key={status.id}>{status.name}</Option>
  ));

  const priorityOptions = priorities.map(priority => (
    <Option key={priority.id}>{priority.name}</Option>
  ));
  return (
    <Modal
      visible={visible}
      title="Create a Case"
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create Case"
      style={{ padding: "0px" }}
      destroyOnClose={true}
    >
      <Form colon={false}>
        <Form.Item label="Name" required>
          <Input
            placeholder="Found Ryuk"
            ref={input => input && input.focus()}
          />
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
        <Form.Item label="Tags">
          <Select
            mode="tags"
            placeholder="Enter tags"
            tokenSeparators={[","]}
          />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea placeholder="Enter description here" rows={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCaseModalP;
