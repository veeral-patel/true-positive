import { useQuery } from "@apollo/react-hooks";
import { RouteComponentProps } from "@reach/router";
import { Button, Col, Divider, Form, Input, Row, Spin, Typography } from "antd";
import gql from "graphql-tag";
import Error from "presentational/shared/errors/Error";
import React from "react";
import IUser from "ts/interfaces/IUser";

const { Paragraph } = Typography;

// ---

const GET_ME = gql`
  query {
    me {
      username
      email
    }
  }
`;

interface MeData {
  me: IUser;
}

// ---

interface Props extends RouteComponentProps {}

function ProfilePage(props: Props) {
  const { loading, error, data } = useQuery<MeData>(GET_ME);

  return (
    <>
      <Row>
        <h3>Profile</h3>
      </Row>
      <Divider />
      {loading && <Spin />}
      {error && (
        <Error title="Could not fetch basic info" subtitle={error.message} />
      )}
      {data && (
        <Row style={{ marginTop: "2em" }}>
          <Col span={8}>
            <Paragraph strong>Basic Info</Paragraph>
            <Paragraph type="secondary">
              Update your username or email address
            </Paragraph>
          </Col>
          <Col span={10}>
            <Form
              layout="vertical"
              colon={false}
              initialValues={{
                username: data.me.username,
                email: data.me.email
              }}
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  { required: true, message: "You must provide an username" }
                ]}
              >
                <Input placeholder="john_steinbeck" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "You must provide an email address"
                  }
                ]}
              >
                <Input placeholder="john@steinbeck.io" />
              </Form.Item>
              <Form.Item>
                <div style={{ float: "right" }}>
                  <Button htmlType="submit">Update</Button>
                </div>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      )}
      <Divider />
    </>
  );
}

export default ProfilePage;
