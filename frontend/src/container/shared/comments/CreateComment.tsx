import { Avatar, Button, Comment, Form } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import React from "react";

// ----

interface FormProps {
  /* provides many form operations to us */
  form: WrappedFormUtils;

  /* the ID of the task or case we're commenting on */
  objectId: number;

  /* the type of object we're commenting on */
  type: "CASE" | "TASK";
}

// don't use this form on its own
class DumbCreateCommentForm extends React.Component<FormProps> {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Item>
          {getFieldDecorator("comment", {
            rules: [{ required: true, message: "Please enter a comment" }]
          })(
            <TextArea
              placeholder="Leave a comment"
              rows={3}
              style={{ padding: "2%" }}
            />
          )}
        </Form.Item>
        <Form.Item style={{ float: "right" }}>
          <Button htmlType="submit">Add Comment</Button>
        </Form.Item>
      </Form>
    );
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // prevent page reload
    event.preventDefault();

    // validate fields
    const { form } = this.props;
    form.validateFields();
  }
}

// ----

const CreateCaseForm = Form.create<FormProps>()(DumbCreateCommentForm);

// ----

interface CreateCommentProps {
  /* the ID of the task or case we're commenting on */
  objectId: number;

  /* the type of object we're commenting on */
  type: "CASE" | "TASK";
}

class CreateComment extends React.Component<CreateCommentProps> {
  render() {
    const { objectId, type } = this.props;
    return (
      <Comment
        content={<CreateCaseForm objectId={objectId} type={type} />}
        avatar={<Avatar icon="user" />}
      />
    );
  }
}

export default CreateComment;
