import { RouteComponentProps } from "@reach/router";
import { inject, observer } from "mobx-react";
import InfoP from "presentational/one_case/InfoP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

interface InfoProps extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
}

export default inject("activeCaseStore")(
  observer(
    class Info extends React.Component<InfoProps> {
      render() {
        return <InfoP />;
      }
    }
  )
);
