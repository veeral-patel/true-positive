import { Button, Modal, Steps, Typography } from "antd";
import React, { useState } from "react";
import ListOfCreateCaseEmailAddresses from "./ListOfCreateCaseEmailAddresses";

const { Paragraph } = Typography;

function Integrations() {
  const [visibleModal, setVisibleModal] = useState<
    "CREATE_INBOUND_ADDRESS" | null
  >(null);

  return (
    <>
      <h3>Integrations</h3>
      <Paragraph>Create cases from inbound email</Paragraph>
      <Paragraph type="secondary">
        True Positive can ingest and create cases from emails sent to a mailbox,
        such as phishing@ecorp.com.
      </Paragraph>
      <Paragraph type="secondary">
        Simply generate an inbound email address below and forward emails from
        your existing mailbox to this address. We'll create a case for every
        email received and attach the original email as a file.
      </Paragraph>
      <Button
        type="link"
        style={{ padding: "0px" }}
        onClick={() => setVisibleModal("CREATE_INBOUND_ADDRESS")}
      >
        Generate an inbound email address
      </Button>
      <div style={{ marginTop: "1em" }}>
        <ListOfCreateCaseEmailAddresses />
      </div>
      <Modal
        visible={visibleModal === "CREATE_INBOUND_ADDRESS"}
        title="Generate an inbound email address"
        footer={null}
        onCancel={() => setVisibleModal(null)}
      >
        <Steps size="small" progressDot>
          <Steps.Step title="Generate address"></Steps.Step>
          <Steps.Step title="Choose a case template"></Steps.Step>
          <Steps.Step title="Forward email from an existing mailbox"></Steps.Step>
        </Steps>
      </Modal>
    </>
  );
}

export default Integrations;
