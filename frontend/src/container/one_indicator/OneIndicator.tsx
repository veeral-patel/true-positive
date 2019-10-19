import { navigate, RouteComponentProps } from "@reach/router";
import { Col, Divider, Icon, Layout, PageHeader, Row, Typography } from "antd";
import ActionsDropdown from "container/one_indicator/ActionsDropdown";
import { inject, observer } from "mobx-react";
import ErrorP from "presentational/shared/errors/ErrorP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import formatISO8601 from "utils/formatISO8601";
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
                  <Text style={{ fontSize: 16 }} editable>
                    {activeIndicator.name}
                  </Text>
                }
                extra={
                  <ActionsDropdown
                    indicatorId={activeIndicator.id}
                    caseId={activeCase.id}
                  />
                }
              />
              <section style={{ lineHeight: 3 }}>
                <Row>
                  <Col span={24}>
                    <Divider orientation="left">Details</Divider>
                  </Col>
                </Row>
                <Row>
                  <Col span={4}>Created:</Col>
                  <Col span={20}>
                    {`${formatISO8601(activeIndicator.createdAt)} UTC by ${
                      activeIndicator.createdBy.username
                    }`}
                  </Col>
                </Row>
              </section>
            </Content>
          );
        }
      }
    }
  )
);
