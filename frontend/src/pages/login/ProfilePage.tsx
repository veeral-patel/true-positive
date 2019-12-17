import { RouteComponentProps } from "@reach/router";
import { Form, Input } from "antd";
import React from "react";

interface Props extends RouteComponentProps {}

function ProfilePage(props: Props) {
  return (
    <Form layout="vertical" colon={false}>
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: "You must have an username" }]}
      >
        <Input placeholder="john_steinbeck" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "You must provide an email address" }
        ]}
      >
        <Input placeholder="john@steinbeck.io" />
      </Form.Item>
    </Form>
  );
}

export default ProfilePage;
