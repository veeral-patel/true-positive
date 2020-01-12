import { Button, Empty, Modal, Steps, Typography } from "antd";
import React, { useState } from "react";

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
        Simply generate an inbound @truepositive.app email address below and
        forward emails from your existing mailbox to this address. We'll create
        a case for every email received and attach the original email as a file.
      </Paragraph>
      <Button
        type="link"
        style={{ padding: "0px" }}
        onClick={() => setVisibleModal("CREATE_INBOUND_ADDRESS")}
      >
        Create an inbound email address
      </Button>
      <Empty
        description={
          <div>
            <h4>No inbound email addresses</h4>
            <Paragraph>
              Generate one above to start creating cases via email
            </Paragraph>
          </div>
        }
      />
      <Modal
        visible={visibleModal === "CREATE_INBOUND_ADDRESS"}
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
