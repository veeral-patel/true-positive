import { Avatar, Button, Comment, Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";

const DumbAddCommentForm: React.FC = () => (
  <Form>
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
  </Form>
);

class CreateComment extends React.Component {
  render() {
    return (
      <Comment
        content={<DumbAddCommentForm />}
        avatar={<Avatar icon="user" />}
      />
    );
  }
}

export default CreateComment;
