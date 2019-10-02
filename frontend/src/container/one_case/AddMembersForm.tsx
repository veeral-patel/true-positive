import { Button, Form, Select } from "antd";
import { FormComponentProps, WrappedFormUtils } from "antd/lib/form/Form";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

interface FormProps {
  userOptions: React.ReactNode[];
  form: WrappedFormUtils;
  activeCaseStore?: ActiveCaseStore;
}

class DumbAddMembersForm extends React.Component<
  FormProps & FormComponentProps
> {
  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // prevent page reload
    event.preventDefault();

    // validate fields in our form
    const { form, activeCaseStore } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        values.members.forEach((username: string) => {
          activeCaseStore!.addCaseMember(username);
        });
      }
    });
  }

  render() {
    const { userOptions } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form style={{ display: "flex" }} onSubmit={this.handleSubmit.bind(this)}>
        <Form.Item style={{ flex: "80%" }}>
          {getFieldDecorator("members", {
            rules: [
              {
                required: true,
                message: "Please select at least one user"
              }
            ]
          })(
            <Select
              style={{ width: "100%" }}
              mode="multiple"
              placeholder="Select users to add"
            >
              {userOptions}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Add Members</Button>
        </Form.Item>
      </Form>
    );
  }
}

const AddMembersForm = Form.create<FormProps & FormComponentProps>()(
  inject("activeCaseStore")(observer(DumbAddMembersForm))
);

export default AddMembersForm;
