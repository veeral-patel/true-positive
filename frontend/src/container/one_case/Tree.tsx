import { RouteComponentProps } from "@reach/router";
import { inject, observer } from "mobx-react";
import TreeP from "presentational/one_case/TreeP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

interface TreeProps extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
}

export default inject("activeCaseStore")(
  observer(
    class Tree extends React.Component<TreeProps> {
      render() {
        const { activeCaseStore } = this.props;
        const activeCase = activeCaseStore!.activeCase;

        // should always render, since we're catching errors and showing
        // our spinner above this, as a HOC
        if (activeCase) return <TreeP caseName={activeCase.name} />;
      }
    }
  )
);
