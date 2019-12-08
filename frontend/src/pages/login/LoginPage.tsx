import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { inject, observer } from "mobx-react";
import React from "react";
import AuthStore from "stores/AuthStore";

// ----

interface FormProps {
  form: WrappedFormUtils;
  authStore?: AuthStore;
}

// NEVER use this component on its own. use the LoginForm component below
class DumbLoginForm extends React.Component<FormProps> {
  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // prevent page reload
    e.preventDefault();

    // validate our fields and raise errors if needed
    const { authStore, form } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        // make API request to fetch our JWT
        const username = form.getFieldValue("username");
        const password = form.getFieldValue("password");
        authStore!.login(username, password);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please enter your username" }]
          })(
            <Input prefix={<UserOutlined />} placeholder="Username" autoFocus />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please enter your password" }]
          })(
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

// provide our form with validation abilities and access to the authentication store
const LoginForm = Form.create()(inject("authStore")(observer(DumbLoginForm)));

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
