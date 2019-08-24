import { RouteComponentProps } from "@reach/router";
import { Result, Spin } from "antd";
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
        if (activeCaseStore!.activeCaseIsLoading) return <Spin />;
        else {
          const activeCase = activeCaseStore!.activeCase;
          if (activeCase) return <InfoP caseName={activeCase.name} />;
          else {
            return <Result status="error" title="Could not fetch case" subTitle="Please ensure that the case exists and that your Internet connection is working." />;
          }
        }
      }
    }
  )
);
