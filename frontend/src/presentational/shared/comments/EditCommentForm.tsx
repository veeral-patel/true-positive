import { Button, Form } from "antd";
import CommentEditor from "container/shared/markdown/GenericEditor";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

interface Props {
  activeCaseStore?: ActiveCaseStore;
  initialComment: string;
  commentId: number;
  handleCancel: () => void;
}

const EditCommentForm = inject("activeCaseStore")(
  observer(
    class InnerForm extends React.Component<Props> {
      render() {
        const {
          initialComment,
          handleCancel,
          commentId,
          activeCaseStore
        } = this.props;

        return (
          <Form
            colon={false}
            layout="vertical"
            onFinish={values => {
              activeCaseStore!.changeComment(commentId, values.comment);
            }}
            initialValues={{
              comment: initialComment
            }}
          >
            <Form.Item
              label="Comment"
              name="comment"
              rules={[{ required: true, message: "Comment cannot be blank" }]}
            >
              <CommentEditor />
            </Form.Item>
            <Form.Item>
              <>
                <Button type="link" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button htmlType="submit">Update</Button>
              </>
            </Form.Item>
          </Form>
        );
      }
    }
  )
);

export default EditCommentForm;
