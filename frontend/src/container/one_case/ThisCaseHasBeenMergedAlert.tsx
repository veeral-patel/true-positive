import { RouteComponentProps } from "@reach/router";
import { Alert, Typography } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import formatISO8601 from "utils/formatISO8601";
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

        if (
          activeCase &&
          activeCase.isMerged &&
          activeCase.mergedInto &&
          activeCase.mergedAt
        ) {
          const formattedTime = formatISO8601(activeCase.mergedAt);
          const message = (
            <Text>
              This case was merged into{" "}
              <a href={getPathToACase(activeCase.mergedInto.id)}>
                {activeCase.mergedInto.name}
              </a>{" "}
              at {formattedTime} UTC.
            </Text>
          );
          return <Alert message={message} type="info" showIcon />;
        }
        return null;
      }
    }
  )
);
