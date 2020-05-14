import { Button, Form, Typography } from "antd";
import PrioritySelect from "container/shared/priorities/PrioritySelect";
import React from "react";

const { Paragraph } = Typography;

function DefaultPrioritySection() {
  return (
    <>
      <Paragraph>Default Priority</Paragraph>
      <Paragraph type="secondary">
        If you don't want to choose a priority each time you create a case,
        choose a default priority below.
      </Paragraph>
      <Paragraph type="secondary">
        Then, the UI will pre-populate the priority field with the default
        priority you chose.
      </Paragraph>
      <Form colon={false} layout="horizontal" style={{ display: "flex" }}>
        <Form.Item
          name="default_priority"
          style={{ width: "300px", marginRight: "0.5em" }}
        >
          <PrioritySelect includeNone={true} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Update</Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default DefaultPrioritySection;
