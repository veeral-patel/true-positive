import { Drawer, Form, Input } from "antd";
import React from "react";

interface Props {
  visible: boolean;
  onClose: () => void;
}

function CreateFormDrawer({ visible, onClose }: Props) {
  return (
    <Drawer
      visible={visible}
      title={<h3>Create a form</h3>}
      width={600}
      maskClosable={false}
      keyboard={false}
      onClose={onClose}
    >
      <Form colon={false} layout="vertical" style={{ marginTop: "0.5em" }}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please name your form" }]}
        >
          <Input placeholder="Live response findings" />
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default CreateFormDrawer;
