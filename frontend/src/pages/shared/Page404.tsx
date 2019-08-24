import { navigate, RouteComponentProps } from "@reach/router";
import { Button, Result } from "antd";
import React from "react";
import { paths } from "utils/constants";

interface Page404Props extends RouteComponentProps {
  showBackButton?: boolean;
}

const Page404: React.FC<Page404Props> = ({ showBackButton }) => {
  const showBackButtonReal =
    showBackButton !== undefined ? showBackButton : true;
  return (
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
  );
};

export default Page404;
