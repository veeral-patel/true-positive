import { RouteComponentProps } from "@reach/router";
import { inject, observer } from "mobx-react";
import ObservablesP from "presentational/one_case/ObservablesP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

interface ObservablesProps extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
}

export default inject("activeCaseStore")(
  observer(
    class Observables extends React.Component<ObservablesProps> {
      render() {
        const { activeCaseStore } = this.props;
        const activeCase = activeCaseStore!.activeCase;

        // should always render, since we're catching errors and showing spinner above this component
        if (activeCase) return <ObservablesP />;
      }
    }
  )
);
