import { Form, Select } from "antd";
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
      <Form>
        <Form.Item>
          {getFieldDecorator("status")(
            <Select
              style={{ width: "100%" }}
              mode="multiple"
              placeholder="Add members"
            >
              {userOptions}
            </Select>
          )}
        </Form.Item>
      </Form>
    );
  }
}

const AddMembersForm = Form.create<FormProps & FormComponentProps>()(
  DumbAddMembersForm
);

export default AddMembersForm;
