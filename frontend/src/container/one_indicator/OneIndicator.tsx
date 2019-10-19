import { navigate, RouteComponentProps } from "@reach/router";
import { Icon, Layout, PageHeader, Typography } from "antd";
import { inject, observer } from "mobx-react";
import ErrorP from "presentational/shared/errors/ErrorP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import { getPathToCaseTasks } from "utils/pathHelpers";

const { Content } = Layout;
const { Text } = Typography;

interface Props extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
  indicatorId?: number;
}

export default inject("activeCaseStore")(
  observer(
    class OneIndicator extends React.Component<Props> {
      render() {
        const { activeCaseStore, indicatorId } = this.props;
        const activeCase = activeCaseStore!.activeCase;

        if (!indicatorId) {
          return (
            <ErrorP
              title="Could not extract this indicator's ID from the URL"
              subtitle="Ensure you're at a valid URL"
            />
          );
        }

        const activeIndicator = activeCaseStore!.getIndicator(indicatorId);

        if (!activeIndicator) {
          return (
            <ErrorP
              title="Could not load indicator"
              subtitle="Ensure that an indicator with this ID exists"
            />
          );
        }

        if (activeCase) {
          return (
            <Content
              style={{
                backgroundColor: "#fff",
                padding: 24,
                height: "100%"
              }}
            >
              <PageHeader
                onBack={() => navigate(getPathToCaseTasks(activeCase.id))}
                backIcon={<Icon type="arrow-left" style={{ fontSize: 14 }} />}
                title={
                  <Text style={{ fontSize: 16 }}>{activeIndicator.name}</Text>
                }
              />
            </Content>
          );
        }
      }
    }
  )
);
