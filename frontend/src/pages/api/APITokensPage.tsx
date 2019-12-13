import { RouteComponentProps } from "@reach/router";
import { Alert } from "antd";
import React from "react";

interface Props extends RouteComponentProps {}

function APITokensPage(props: Props) {
  return (
    <>
      <h3>API Tokens</h3>
      <Alert
        showIcon
        type="warning"
        message="Guard your tokens! They provide full access to your account."
      />
    </>
  );
}

export default APITokensPage;
