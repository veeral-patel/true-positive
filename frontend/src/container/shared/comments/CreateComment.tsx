import { Avatar, Button, Comment, Form } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

// ----

interface FormProps {
  /* the ID of the task or case we're commenting on */
  objectId: number;

  /* the type of object we're commenting on */
  type: "CASE" | "TASK";

  /* used to make the API request to create a comment */
  activeCaseStore?: ActiveCaseStore;
}

// don't use this form on its own
class DumbCreateCommentForm extends React.Component<
  FormProps & FormComponentProps
> {
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
    const { form, objectId, type, activeCaseStore } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        activeCaseStore!.createComment(type, objectId, values.comment);
      }
    });
  }
}

// ----

const CreateCaseForm = Form.create<FormProps & FormComponentProps>()(
  inject("activeCaseStore")(observer(DumbCreateCommentForm))
);

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
