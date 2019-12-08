import { ArrowLeftOutlined } from "@ant-design/icons";
import { navigate, RouteComponentProps } from "@reach/router";
import { Col, Divider, Input, Layout, PageHeader, Row, Typography } from "antd";
import ActionsDropdown from "container/one_indicator/ActionsDropdown";
import IndicatorForm from "container/one_indicator/IndicatorForm";
import CreateComment from "container/shared/comments/CreateComment";
import DescriptionEditor from "container/shared/markdown/DescriptionEditor";
import { inject, observer } from "mobx-react";
import CommentListP from "presentational/shared/comments/CommentListP";
import Error from "presentational/shared/errors/Error";
import EditableTagList from "presentational/shared/tags/EditableTagList";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import formatISO8601 from "utils/formatISO8601";
import { getPathToCaseIndicators } from "utils/pathHelpers";
import sortCommentsByCreatedAt from "utils/sortCommentsByCreatedAt";

const { TextArea } = Input;
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
            <Error
              title="Could not extract this indicator's ID from the URL"
              subtitle="Ensure you're at a valid URL"
            />
          );
        }

        const activeIndicator = activeCaseStore!.getIndicator(indicatorId);

        if (!activeIndicator) {
          return (
            <Error
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
                onBack={() => navigate(getPathToCaseIndicators(activeCase.id))}
                backIcon={<ArrowLeftOutlined style={{ fontSize: 14 }} />}
                title={
                  <Text
                    style={{
                      fontSize: 16
                    }}
                    ellipsis
                    editable={{
                      onChange: (newText: string) =>
                        activeCaseStore!.renameIndicator(
                          activeIndicator.id,
                          newText
                        )
                    }}
                  >
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
                {activeIndicator.type === "STRING" && (
                  <div>
                    <Row>
                      <Col span={4}>Indicator:</Col>
                      <Col span={20}>
                        <Text
                          copyable
                          ellipsis
                          editable={{
                            onChange: (newValue: string) =>
                              activeCaseStore!.changeIndicatorValue(
                                activeIndicator.id,
                                newValue
                              )
                          }}
                        >
                          {activeIndicator.indicator}
                        </Text>
                      </Col>
                    </Row>
                  </div>
                )}
                <Row>
                  <Col span={4}>Created:</Col>
                  <Col span={20}>
                    {`${formatISO8601(activeIndicator.createdAt)} UTC by ${
                      activeIndicator.createdBy.username
                    }`}
                  </Col>
                </Row>
              </section>
              <section style={{ lineHeight: 3 }}>
                <Row>
                  <Col span={4}>Tags:</Col>
                  <Col span={20}>
                    <EditableTagList
                      existingTags={activeIndicator.tags}
                      type="INDICATOR"
                      objectId={activeIndicator.id}
                    />
                  </Col>
                </Row>
              </section>

              {activeIndicator.type === "TEXT" && (
                <section>
                  <Row>
                    <Col span={24}>
                      <Divider orientation="left">Indicator</Divider>
                    </Col>
                  </Row>
                  <Row>
                    <IndicatorForm activeIndicator={activeIndicator} />
                  </Row>
                </section>
              )}

              <section>
                <Divider orientation="left">Description</Divider>
                <DescriptionEditor
                  initialValue={activeIndicator.description}
                  updateValue={newDescription =>
                    activeCaseStore!.changeDescription(
                      activeIndicator.id,
                      newDescription,
                      "INDICATOR"
                    )
                  }
                />
              </section>
              <section>
                <Divider orientation="left">
                  Comments ({activeIndicator.comments.length})
                </Divider>
                {activeIndicator.comments.length > 0 && (
                  <CommentListP
                    comments={sortCommentsByCreatedAt(activeIndicator.comments)}
                  />
                )}
                <CreateComment objectId={activeIndicator.id} type="INDICATOR" />
              </section>
            </Content>
          );
        }
      }
    }
  )
);
