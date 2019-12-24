import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";

interface Props {
  visible: boolean;
  onCancel: () => void;
}

function DeleteCaseModal({ visible, onCancel }: Props) {
  const [confirmationTextIsValid, setConfirmationTextIsValid] = useState(false);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Delete this case"
      footer={null}
    >
      <div>
        Deleting this case will delete its indicators and tasks as well (but not
        any merged cases). This action cannot be undone.
      </div>
      <div style={{ marginTop: "1em" }}>Type "DELETE ME" below to confirm.</div>
      <div style={{ marginTop: "1em" }}>
        <Form colon={false} layout="vertical">
          <Form.Item name="confirmation_text">
            <Input
              placeholder="DELETE ME"
              onChange={event => {
                const inputValue = event.currentTarget.value;
                if (inputValue === "DELETE ME") {
                  setConfirmationTextIsValid(true);
                } else {
                  setConfirmationTextIsValid(false);
                }
              }}
            />
          </Form.Item>
          <Form.Item>
            <div style={{ float: "right" }}>
              <Button style={{ marginRight: "0.5em" }} onClick={onCancel}>
                Cancel
              </Button>
              <Button
                type="danger"
                htmlType="submit"
                disabled={!confirmationTextIsValid}
              >
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
