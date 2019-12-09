import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import AuthStore from "stores/AuthStore";

// ----

interface FormProps {
  authStore?: AuthStore;
}

const LoginForm = inject("authStore")(
  observer(
    class InnerForm extends React.Component<FormProps> {
      render() {
        const { authStore } = this.props;
        return (
          <Form
            colon={false}
            layout="vertical"
            onFinish={values =>
              authStore!.login(values.username, values.password)
            }
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please enter your username" }
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                autoFocus
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" }
              ]}
            >
              <Input
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        );
      }
    }
  )
);

// -----

export default class LoginPage extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "rgb(240, 242, 245)",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div style={{ width: "33%", marginTop: "10%" }}>
          <LoginForm />
        </div>
      </div>
    );
  }
}
