import { useMutation } from "@apollo/react-hooks";
import { Button, Drawer, Form, message, notification } from "antd";
import CaseTemplateSelect from "container/admin/CaseTemplateSelect";
import UserSelect from "container/shared/users/UserSelect";
import CREATE_CREATE_CASE_EMAIL_ADDRESS from "mutations/createCreateCaseEmailAddress";
import GET_CREATE_CASE_EMAIL_ADDRESSES from "queries/getCreateCaseEmailAddresses";
import React from "react";

interface Props {
  visible: boolean;
  onClose: () => void;
}

function CreateCCEmailAddressDrawer({ visible, onClose }: Props) {
  const [createInboundAddress] = useMutation(CREATE_CREATE_CASE_EMAIL_ADDRESS, {
    onCompleted: function() {
      message.success("Created inbound address");
      onClose();
    },
    onError: function(error) {
      notification.error({
        message: "Failed to create inbound address",
        description: error.message
      });
    },
    refetchQueries: [{ query: GET_CREATE_CASE_EMAIL_ADDRESSES }]
  });

  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      title={<h3>Create an inbound address</h3>}
      width={600}
    >
      <Form
        layout="vertical"
        colon={false}
        style={{ marginTop: "1em" }}
        onFinish={values =>
          createInboundAddress({
            variables: {
              input: {
                caseTemplateId: values.case_template_id,
                defaultCreator: values.default_creator
              }
            }
          })
        }
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
        <Form.Item
          style={{ position: "absolute", bottom: "1em", right: "2em" }}
        >
          <>
            <Button style={{ marginRight: "1em" }} onClick={onClose}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Create address
            </Button>
          </>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default CreateCCEmailAddressDrawer;
