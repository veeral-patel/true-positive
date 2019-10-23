import { Button, Form, Input } from "antd";
import { FormComponentProps, WrappedFormUtils } from "antd/lib/form/Form";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

const { TextArea } = Input;

interface FormProps {
  form: WrappedFormUtils;
  activeCaseStore?: ActiveCaseStore;
  initialComment: string;
  commentId: number;
}

class DumbEditCommentForm extends React.Component<FormProps> {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { initialComment } = this.props;

    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Item>
          {getFieldDecorator("comment", {
            initialValue: initialComment
          })(<TextArea style={{ paddingTop: "2%" }} />)}
        </Form.Item>
        <Form.Item>
          <Button type="link" onClick={() => this.setState({ editing: false })}>
            Cancel
          </Button>
          <Button htmlType="submit">Update</Button>
        </Form.Item>
      </Form>
    );
  }

  handleSubmit(event: React.FormEvent<HTMLElement>) {
    // prevent page reload
    event.preventDefault();

    // validate fields in our form
    const { form, activeCaseStore, commentId } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        activeCaseStore!.changeComment(commentId, values.comment);
      }
    });
  }
}

const EditCommentForm = Form.create<FormProps & FormComponentProps>()(
  inject("activeCaseStore")(observer(DumbEditCommentForm))
);

export default EditCommentForm;
