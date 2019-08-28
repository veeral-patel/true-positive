import { RouteComponentProps } from "@reach/router";
import { inject, observer } from "mobx-react";
import MembersP from "presentational/one_case/MembersP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

interface MembersProps extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
}

export default inject("activeCaseStore")(
  observer(
    class Members extends React.Component<MembersProps> {
      render() {
        const { activeCaseStore } = this.props;
        const activeCase = activeCaseStore!.activeCase;

        // should always render, since we're catching errors and showing
        // our spinner above this component, as a HOC
        if (activeCase) return <MembersP members={activeCase.members} />;
      }
    }
  )
);
