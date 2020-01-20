import { Button, Typography } from "antd";
import ListOfCreateCaseEmailAddresses from "container/admin/ListOfCreateCaseEmailAddresses";
import React, { useState } from "react";
import CreateCCEmailAddressDrawer from "./CreateCCEmailAddressDrawer";

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
      <CreateCCEmailAddressDrawer
        visible={openDrawer === "CREATE_INBOUND_ADDRESS"}
        onClose={() => setOpenDrawer(null)}
      />
    </>
  );
}

export default Integrations;
