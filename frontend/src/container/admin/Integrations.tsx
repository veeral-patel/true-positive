import { useMutation } from "@apollo/react-hooks";
import { Button, Drawer, Form, message, notification, Typography } from "antd";
import CaseTemplateSelect from "container/admin/CaseTemplateSelect";
import ListOfCreateCaseEmailAddresses from "container/admin/ListOfCreateCaseEmailAddresses";
import UserSelect from "container/shared/users/UserSelect";
import CREATE_CREATE_CASE_EMAIL_ADDRESS from "mutations/createCreateCaseEmailAddress";
import GET_CREATE_CASE_EMAIL_ADDRESSES from "queries/getCreateCaseEmailAddresses";
import React, { useState } from "react";

const { Paragraph } = Typography;

function Integrations() {
  const [openDrawer, setOpenDrawer] = useState<"CREATE_INBOUND_ADDRESS" | null>(
    null
  );

  const [createInboundAddress] = useMutation(CREATE_CREATE_CASE_EMAIL_ADDRESS, {
    onCompleted: function() {
      message.success("Created inbound address");
      setOpenDrawer(null);
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
    <>
      <h3>Integrations</h3>
      <Paragraph>Create cases from inbound email</Paragraph>
      <Paragraph type="secondary">
        True Positive can ingest and create cases from emails sent to a mailbox,
        such as phishing@ecorp.com.
      </Paragraph>
      <Button
        type="link"
        style={{ padding: "0px" }}
        onClick={() => setOpenDrawer("CREATE_INBOUND_ADDRESS")}
      >
        Create an inbound address
      </Button>
      <div style={{ marginTop: "1em" }}>
        <ListOfCreateCaseEmailAddresses />
      </div>
      <Drawer
        visible={openDrawer === "CREATE_INBOUND_ADDRESS"}
        onClose={() => setOpenDrawer(null)}
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
            rules={[
              { required: true, message: "Please choose a case template" }
            ]}
            extra={
              <div style={{ marginTop: "0.5em" }}>
                Cases created from emails sent to this address will be
                initialized from the template above.
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
              <Button
                style={{ marginRight: "1em" }}
                onClick={() => setOpenDrawer(null)}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Create address
              </Button>
            </>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default Integrations;
