import { navigate, RouteComponentProps } from "@reach/router";
import { Button, Layout, Result } from "antd";
import React from "react";
import { paths } from "utils/constants";

const { Content } = Layout;

interface Page404Props extends RouteComponentProps {
  showBackButton?: boolean;
}

const Error404P: React.FC<Page404Props> = ({ showBackButton }) => {
  const showBackButtonReal =
    showBackButton !== undefined ? showBackButton : true;
  return (
    <Content
      style={{
        backgroundColor: "#fff",
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
          showBackButtonReal ? (
            <Button type="primary" onClick={() => navigate(paths.ROOT_PATH)}>
              Back Home
            </Button>
          ) : (
            <span />
          )
        }
      />
    </Content>
  );
};

export default Error404P;
