import { Avatar, Button, Comment, Form } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import React from "react";

interface FormProps {
  form: WrappedFormUtils;
}

// don't use this form on its own
const DumbCreateCommentForm: React.FC<FormProps> = () => (
  <Form>
    <Form.Item>
      <TextArea
        placeholder="Leave a comment"
        rows={3}
        style={{ padding: "2%" }}
      />
    </Form.Item>
    <Form.Item style={{ float: "right" }}>
      <Button htmlType="submit">Add Comment</Button>
    </Form.Item>
  </Form>
);

const CreateCaseForm = Form.create()(DumbCreateCommentForm);

class CreateComment extends React.Component {
  render() {
    return (
      <Comment content={<CreateCaseForm />} avatar={<Avatar icon="user" />} />
    );
  }
}

export default CreateComment;
