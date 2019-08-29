import { RouteComponentProps } from "@reach/router";
import OneTaskP from "presentational/one_task/OneTaskP";
import React from "react";

interface OneTaskProps extends RouteComponentProps {}

const OneTask: React.FC<OneTaskProps> = () => {
  return <OneTaskP />;
};

export default OneTask;
