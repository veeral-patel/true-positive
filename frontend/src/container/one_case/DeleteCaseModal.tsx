import { Button, Form, Input, Modal } from "antd";
import React from "react";

interface Props {
  visible: boolean;
}

function DeleteCaseModal({ visible }: Props) {
  return (
    <Modal visible={visible} title="Delete this case" footer={null}>
      <div>
        Deleting this case will delete its indicators and tasks as well (but not
        any merged cases). This action cannot be undone.
      </div>
      <div style={{ marginTop: "1em" }}>Type "DELETE ME" below to confirm.</div>
      <div style={{ marginTop: "1em" }}>
        <Form>
          <Form.Item>
            <Input placeholder="DELETE ME" />
          </Form.Item>
          <Form.Item>
            <div style={{ float: "right" }}>
              <Button style={{ marginRight: "0.5em" }}>Cancel</Button>
              <Button type="danger" htmlType="submit" disabled>
                Delete Case
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default DeleteCaseModal;
