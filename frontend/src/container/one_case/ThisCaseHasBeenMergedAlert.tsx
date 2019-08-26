import { RouteComponentProps } from "@reach/router";
import { Alert } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

interface AlertProps extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
}

export default inject("activeCaseStore")(
  observer(
    class ThisCaseHasBeenMergedAlert extends React.Component<AlertProps> {
      render() {
        const { activeCaseStore } = this.props;
        const activeCase = activeCaseStore!.activeCase;

        // should always be true
        if (activeCase) {
          if (activeCase.isMerged) {
            return (
              <Alert message="This case has been merged" type="info" showIcon />
            );
          } else {
            return null;
          }
        }
      }
    }
  )
);
