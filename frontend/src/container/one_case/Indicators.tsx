import { RouteComponentProps } from "@reach/router";
import { inject, observer } from "mobx-react";
import IndicatorsP from "presentational/one_case/IndicatorsP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

interface IndicatorsProps extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
}

export default inject("activeCaseStore")(
  observer(
    class Indicators extends React.Component<IndicatorsProps> {
      render() {
        const { activeCaseStore } = this.props;
        const activeCase = activeCaseStore!.activeCase;

        // should always render, since we're catching errors and showing spinner above this component
        if (activeCase) return <IndicatorsP />;
      }
    }
  )
);
