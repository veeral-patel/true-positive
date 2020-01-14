import { Drawer, Form, Input } from "antd";
import React from "react";

interface Props {
  visible: boolean;
  onClose: () => void;
}

function UpdateCCEmailAddressDrawer({ visible, onClose }: Props) {
  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      title={<h3>Update inbound address</h3>}
      width={600}
    >
      <Form colon={false} layout="vertical">
        <Form.Item label="Inbound Address" name="inbound_address">
          <Input disabled />
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default UpdateCCEmailAddressDrawer;
