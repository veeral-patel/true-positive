import { navigate, RouteComponentProps } from "@reach/router";
import { Button, Layout, Result } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import UIStore from "stores/UIStore";
import { paths } from "utils/constants";

const { Content } = Layout;

interface Page404Props extends RouteComponentProps {
  showBackButton?: boolean;
  uiStore?: UIStore;
}

const Error404P: React.FC<Page404Props> = ({ showBackButton, uiStore }) => {
  const showBackButtonReal =
    showBackButton !== undefined ? showBackButton : true;
  return (
    <Content
      style={{
        backgroundColor: uiStore!.theme === "LIGHT" ? "#fff" : "#141414",
        padding: 24,
        marginLeft: 24,
        height: "100%"
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          showBackButtonReal && (
            <Button type="primary" onClick={() => navigate(paths.ROOT_PATH)}>
              Go Back Home
            </Button>
          )
        }
      />
    </Content>
  );
};

export default inject("uiStore")(observer(Error404P));
