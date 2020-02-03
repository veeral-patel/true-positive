import { Button, Empty, Tabs, Typography } from "antd";
import React from "react";

const { Paragraph } = Typography;

function Webhooks() {
  return (
    <>
      <h3>Webhooks</h3>
      <Tabs defaultActiveKey="inboundWebhooks">
        <Tabs.TabPane key="inboundWebhooks" tab="Inbound">
          <Paragraph type="secondary">
            Create an inbound webhook so True Positive can create cases when
            events happen in an external tool.
          </Paragraph>
          <Button type="link" style={{ padding: "0px" }}>
            Create a webhook
          </Button>
          <Empty
            description={
              <div>
                <h4>No webhooks</h4>
                <Paragraph>Create an inbound webhook above</Paragraph>
              </div>
            }
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="outboundWebhooks" tab="Outbound">
          <Paragraph type="secondary">
            Create an outbound webhook to notify an external tool when events
            happen in True Positive.
          </Paragraph>
          <Button type="link" style={{ padding: "0px" }}>
            Create a webhook
          </Button>
          <Empty
            description={
              <div>
                <h4>No webhooks</h4>
                <Paragraph>Create an outbound webhook above</Paragraph>
              </div>
            }
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}

export default Webhooks;
