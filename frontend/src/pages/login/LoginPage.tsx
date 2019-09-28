import { Button, Form, Icon, Input } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import React from "react";

// ----

interface Props {
  form: WrappedFormUtils;
}

class LoginForm extends React.Component<Props> {
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please enter your username" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              autoFocus
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please enter your password" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
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

const WrappedLoginForm = Form.create()(LoginForm);

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
          <WrappedLoginForm />
        </div>
      </div>
    );
  }
}
