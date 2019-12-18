import { RouteComponentProps } from "@reach/router";
import { Col, Divider, Form, Input, Row, Typography } from "antd";
import React from "react";

const { Paragraph } = Typography;

interface Props extends RouteComponentProps {}

function ProfilePage(props: Props) {
  return (
    <>
      <Row>
        <h3>Profile</h3>
      </Row>
      <Divider />
      <Row style={{ marginTop: "2em" }}>
        <Col span={8}>
          <Paragraph strong>Basic Info</Paragraph>
          <Paragraph type="secondary">
            Update your username or email address
          </Paragraph>
        </Col>
        <Col span={10}>
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
        </Col>
      </Row>
      <Divider />
    </>
  );
}

export default ProfilePage;
