import { RouteComponentProps } from "@reach/router";
import { inject, observer } from "mobx-react";
import OneTaskBreadcrumbP from "presentational/one_task/OneTaskBreadcrumbP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

interface OneTaskBreadcrumbProps extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
}

export default inject("activeCaseStore")(
  observer(
    class OneTaskBreadcrumb extends React.Component<OneTaskBreadcrumbProps> {
      render() {
        const { activeCaseStore } = this.props;

        const activeCase = activeCaseStore!.activeCase;

        if (activeCase)
          return (
            <OneTaskBreadcrumbP
              caseName={activeCase.name}
              caseId={activeCase.id}
            />
          );
      }
    }
  )
);
