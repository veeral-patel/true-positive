import { Button, Form } from "antd";
import CaseTemplateSelect from "container/admin/CaseTemplateSelect";
import UserSelect from "container/shared/users/UserSelect";
import React from "react";

interface Values {
  default_creator: string;
  case_template_id: number;
}

interface Props {
  onFinish: (values: Values) => void;
  onClose: () => void;
  initialValues: Values | null;
  submitText: string;
}

function CCEmailAddressForm({
  onFinish,
  onClose,
  initialValues,
  submitText
}: Props) {
  return (
    <Form
      layout="vertical"
      colon={false}
      style={{ marginTop: "1em" }}
      initialValues={initialValues ? initialValues : undefined}
    >
      <Form.Item
        label="Case Template"
        name="case_template_id"
        rules={[{ required: true, message: "Please choose a case template" }]}
        extra={
          <div style={{ marginTop: "0.5em" }}>
            Cases created from emails sent to this address will be initialized
            from the template above.
          </div>
        }
      >
        <CaseTemplateSelect />
      </Form.Item>
      <Form.Item
        label="Default Creator"
        name="default_creator"
        rules={[{ required: true, message: "Please choose a user" }]}
        extra={
          <div style={{ marginTop: "0.5em" }}>
            The user above will be marked as the creator of, and have edit
            access to, cases created from emails sent to this address.
          </div>
        }
      >
        <UserSelect />
      </Form.Item>
      <Form.Item style={{ position: "absolute", bottom: "1em", right: "2em" }}>
        <>
          <Button style={{ marginRight: "1em" }} onClick={onClose}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            {submitText}
          </Button>
        </>
      </Form.Item>
    </Form>
  );
}

export default CCEmailAddressForm;
