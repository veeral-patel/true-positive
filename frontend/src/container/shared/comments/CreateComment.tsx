import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Comment, Form } from "antd";
import CommentEditor from "container/shared/markdown/GenericEditor";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

// ----

interface Props {
  /* the ID of the task or case we're commenting on */
  objectId: number;

  /* the type of object we're commenting on */
  type: "CASE" | "TASK" | "INDICATOR";

  /* used to make the API request to create a comment */
  activeCaseStore?: ActiveCaseStore;
}

const CreateCaseForm = inject("activeCaseStore")(
  observer(
    class InnerForm extends React.Component<Props> {
      render() {
        const { type, objectId, activeCaseStore } = this.props;
        return (
          <Form
            colon={false}
            layout="vertical"
            onFinish={values => {
              activeCaseStore!.createComment(type, objectId, values.comment);
            }}
          >
            <Form.Item
              name="comment"
              rules={[{ required: true, message: "Please enter a comment" }]}
            >
              <CommentEditor />
            </Form.Item>
            <Form.Item style={{ float: "right" }}>
              <Button htmlType="submit">Add Comment</Button>
            </Form.Item>
          </Form>
        );
      }
    }
  )
);

// ----

interface CreateCommentProps {
  /* the ID of the task or case we're commenting on */
  objectId: number;

  /* the type of object we're commenting on */
  type: "CASE" | "TASK" | "INDICATOR";
}

class CreateComment extends React.Component<CreateCommentProps> {
  render() {
    const { objectId, type } = this.props;
    return (
      <Comment
        content={<CreateCaseForm objectId={objectId} type={type} />}
        avatar={<Avatar icon={<UserOutlined />} />}
      />
    );
  }
}

export default CreateComment;
