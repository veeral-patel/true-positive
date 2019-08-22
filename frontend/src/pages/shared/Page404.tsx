import { navigate, RouteComponentProps } from "@reach/router";
import { Button, Result } from "antd";
import React from "react";
import { paths } from "utils/constants";

const Page404: React.FC<RouteComponentProps> = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => navigate(paths.ROOT_PATH)}>
        Back Home
      </Button>
    }
  />
);

export default Page404;
