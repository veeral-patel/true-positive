import { Button, Form, Input, Modal, Typography } from "antd";
import React from "react";

const { Paragraph } = Typography;

interface Props {
  visible: boolean;
  handleClose: () => void;
  handleFinish: (taskGroupName: string) => void;
}

function CreateTaskGroupModal({ visible, handleClose, handleFinish }: Props) {
  return (
    <Modal
      footer={null}
      destroyOnClose={true}
      visible={visible}
      onCancel={handleClose}
      title="Create a Task Group"
      keyboard={false}
    >
      <Paragraph>
        Categorize your tasks using task groups. For example, you might create
        groups called "Triage", "Containment", and "Remediation".
      </Paragraph>
      <Form
        layout="vertical"
        colon={false}
        onFinish={values => values.name && handleFinish(values.name)}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please name your task group" }]}
        >
          <Input placeholder="Containment" autoFocus />
        </Form.Item>
        <Form.Item>
          <div style={{ float: "right" }}>
            <Button style={{ marginRight: "0.5em" }} onClick={handleClose}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateTaskGroupModal;
