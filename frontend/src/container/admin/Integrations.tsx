import { Button, Drawer, Form, Typography } from "antd";
import UserSelect from "container/shared/users/UserSelect";
import React, { useState } from "react";
import CaseTemplateSelect from "./CaseTemplateSelect";
import ListOfCreateCaseEmailAddresses from "./ListOfCreateCaseEmailAddresses";

const { Paragraph } = Typography;

function Integrations() {
  const [openDrawer, setOpenDrawer] = useState<"CREATE_INBOUND_ADDRESS" | null>(
    null
  );

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
        <Form layout="vertical" colon={false} style={{ marginTop: "1em" }}>
          <Form.Item
            label="Case Template"
            name="case_template"
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
            label="Creator"
            name="creator"
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
        </Form>
      </Drawer>
    </>
  );
}

export default Integrations;
