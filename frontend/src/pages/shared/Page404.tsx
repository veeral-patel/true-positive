import React from "react";
import { Result, Button } from "antd";
import { RouteComponentProps, navigate } from "@reach/router";

const Page404: React.FC<RouteComponentProps> = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => navigate("/")}>
        Back Home
      </Button>
    }
  />
);

export default Page404;
