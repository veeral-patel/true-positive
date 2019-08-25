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
        const { activeCaseStore } = this.props;
        const activeCase = activeCaseStore!.activeCase;

        // should always render, since we're catching errors and showing
        // our spinner above this, as a HOC
        if (activeCase) return <InfoP activeCase={activeCase} />;
      }
    }
  )
);
