import { RouteComponentProps } from "@reach/router";
import { Alert, Typography } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import { getPathToACase } from "utils/pathHelpers";

const { Text } = Typography;

interface AlertProps extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
}

export default inject("activeCaseStore")(
  observer(
    class ThisCaseHasBeenMergedAlert extends React.Component<AlertProps> {
      render() {
        const { activeCaseStore } = this.props;
        const activeCase = activeCaseStore!.activeCase;

        if (activeCase && activeCase.isMerged && activeCase.mergedInto) {
          const message = (
            <Text>
              This case was merged into{" "}
              <a href={getPathToACase(activeCase.mergedInto.id)}>
                {activeCase.mergedInto.name}.
              </a>
            </Text>
          );
          return <Alert message={message} type="info" showIcon />;
        }
        return null;
      }
    }
  )
);
