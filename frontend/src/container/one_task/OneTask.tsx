import { RouteComponentProps } from "@reach/router";
import { inject, observer } from "mobx-react";
import OneTaskP from "presentational/one_task/OneTaskP";
import React from "react";

interface OneTaskProps extends RouteComponentProps {}

export default inject("activeTaskStore")(
  observer(
    class OneTask extends React.Component<OneTaskProps> {
      render() {
        return <OneTaskP />;
      }
    }
  )
);
