import { Button, Form, Typography } from "antd";
import StatusSelect from "container/shared/statuses/StatusSelect";
import React from "react";

const { Paragraph } = Typography;

function DefaultStatusSection() {
  return (
    <>
      <Paragraph>Default Status</Paragraph>
      <Paragraph type="secondary">
        If you don't want to choose a status each time you create a case, choose
        a default status below.
      </Paragraph>
      <Paragraph type="secondary">
        Then, the UI will pre-populate the status field with the default status
        you chose.
      </Paragraph>
      <Form colon={false} layout="horizontal" style={{ display: "flex" }}>
        <Form.Item
          name="default_status"
          style={{ width: "300px", marginRight: "0.5em" }}
        >
          <StatusSelect includeNone={true} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Update</Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default DefaultStatusSection;
