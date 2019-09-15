import { Button, Form, Input } from "antd";
import React from "react";

const { TextArea } = Input;

const AddCommentFormP: React.FC = () => (
  <div>
    <Form.Item>
      <TextArea
        placeholder="Leave a comment"
        rows={3}
        style={{ padding: "2%" }}
      />
    </Form.Item>
    <Form.Item style={{ float: "right" }}>
      <Button>Add Comment</Button>
    </Form.Item>
  </div>
);

export default AddCommentFormP;
