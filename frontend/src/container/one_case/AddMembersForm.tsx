import { Button, Form, Select } from "antd";
import { FormComponentProps, WrappedFormUtils } from "antd/lib/form/Form";
import React from "react";

interface FormProps {
  userOptions: React.ReactNode[];
  form: WrappedFormUtils;
}

class DumbAddMembersForm extends React.Component<
  FormProps & FormComponentProps
> {
  render() {
    const { userOptions } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      // add a onSubmit prop to Form below
      <Form style={{ display: "flex" }}>
        <Form.Item style={{ flex: "80%" }}>
          {getFieldDecorator("status")(
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
  DumbAddMembersForm
);

export default AddMembersForm;
