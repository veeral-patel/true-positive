import { useMutation, useQuery } from "@apollo/react-hooks";
import { RouteComponentProps } from "@reach/router";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  notification,
  Row,
  Spin,
  Typography
} from "antd";
import gql from "graphql-tag";
import Error from "presentational/shared/errors/Error";
import React from "react";
import IUser from "ts/interfaces/IUser";

const { Paragraph } = Typography;

// ---

interface MeData {
  me: IUser;
}

const GET_ME = gql`
  query {
    me {
      username
      email
    }
  }
`;

// ---

const UPDATE_ME = gql`
  mutation updateMe($input: UpdateMeInput!) {
    updateMe(input: $input) {
      me {
        username
        email
      }
    }
  }
`;

// ---

const UPDATE_PASSWORD = gql`
  mutation updatePassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input) {
      me {
        username
        email
      }
    }
  }
`;

// ---

interface Props extends RouteComponentProps {}

function ProfilePage(props: Props) {
  const { loading, error, data } = useQuery<MeData>(GET_ME);
  const [updateMe] = useMutation(UPDATE_ME, {
    onCompleted: function() {
      message.success("Updated profile");
    },
    onError: function(error) {
      notification.error({
        message: "Failed to change your password",
        description: error.message
      });
    },
    refetchQueries: [{ query: GET_ME }]
  });

  const [updatePassword] = useMutation(UPDATE_PASSWORD, {
    onCompleted: function() {
      message.success("Successfully changed your password");
    },
    onError: function(error) {
      notification.error({
        message: "Failed to update profile",
        description: error.message
      });
    }
  });

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
              onFinish={values =>
                updateMe({
                  variables: {
                    input: {
                      username: values.username,
                      email: values.email
                    }
                  }
                })
              }
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
          <Divider />
          <Col span={8}>
            <Paragraph strong>Password</Paragraph>
            <Paragraph type="secondary">Change your password</Paragraph>
          </Col>
          <Col span={10}>
            <Form
              layout="vertical"
              colon={false}
              onFinish={values =>
                updatePassword({
                  variables: {
                    input: {
                      currentPassword: values.current_password,
                      newPassword: values.new_password
                    }
                  }
                })
              }
            >
              <Form.Item
                label="Current password"
                name="current_password"
                rules={[
                  { required: true, message: "Enter your current password" }
                ]}
              >
                <Input.Password placeholder="Your current password" />
              </Form.Item>
              <Form.Item
                label="New password"
                name="new_password"
                rules={[{ required: true, message: "Enter your new password" }]}
              >
                <Input.Password placeholder="Your new password" />
              </Form.Item>
              <Form.Item>
                <div style={{ float: "right" }}>
                  <Button htmlType="submit">Change Password</Button>
                </div>
              </Form.Item>
            </Form>
          </Col>
          <Divider />
        </Row>
      )}
    </>
  );
}

export default ProfilePage;
