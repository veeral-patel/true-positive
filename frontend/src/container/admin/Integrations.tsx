import { Button, Modal, Steps, Typography } from "antd";
import React, { useState } from "react";

const { Paragraph } = Typography;

function Integrations() {
  const [visibleModal, setVisibleModal] = useState<"SET_UP_MAILBOX" | null>(
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
      <Paragraph type="secondary">
        Simply generate a random @truepositive.app email address below and
        forward emails from your existing mailbox to this address. We'll create
        a case for every email the generated email address receives and we'll
        attach the original email to it.
      </Paragraph>
      <Button
        type="link"
        style={{ padding: "0px" }}
        onClick={() => setVisibleModal("SET_UP_MAILBOX")}
      >
        Set up a mailbox
      </Button>
      <Modal
        visible={visibleModal === "SET_UP_MAILBOX"}
        title="Set up a mailbox"
        footer={null}
        onCancel={() => setVisibleModal(null)}
      >
        <Steps size="small" progressDot>
          <Steps.Step title="Generate an inbound email address"></Steps.Step>
          <Steps.Step title="Choose a case template"></Steps.Step>
          <Steps.Step title="Forward email from an existing mailbox"></Steps.Step>
        </Steps>
      </Modal>
    </>
  );
}

export default Integrations;
