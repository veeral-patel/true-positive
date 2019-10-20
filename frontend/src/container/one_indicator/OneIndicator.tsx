import { navigate, RouteComponentProps } from "@reach/router";
import {
  Col,
  Divider,
  Icon,
  Input,
  Layout,
  PageHeader,
  Row,
  Typography
} from "antd";
import ActionsDropdown from "container/one_indicator/ActionsDropdown";
import CreateComment from "container/shared/comments/CreateComment";
import DescriptionForm from "container/shared/description/DescriptionForm";
import { inject, observer } from "mobx-react";
import CommentListP from "presentational/shared/comments/CommentListP";
import ErrorP from "presentational/shared/errors/ErrorP";
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
                onBack={() => navigate(getPathToCaseIndicators(activeCase.id))}
                backIcon={<Icon type="arrow-left" style={{ fontSize: 14 }} />}
                title={
                  <Text
                    style={{ fontSize: 16 }}
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
                  <Row>
                    <Col span={4}>Indicator:</Col>
                    <Col span={20}>
                      <Text copyable editable>
                        {activeIndicator.indicator}
                      </Text>
                    </Col>
                  </Row>
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
                    <TextArea
                      defaultValue={activeIndicator.indicator}
                      rows={5}
                      placeholder="Enter your indicator here"
                      style={{ padding: "2%" }}
                    />
                  </Row>
                </section>
              )}

              <section>
                <Divider orientation="left">Description</Divider>
                <DescriptionForm
                  initialDescription={activeIndicator.description}
                  updateDescription={newDescription =>
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
                <div style={{ width: "70%" }}>
                  <CreateComment
                    objectId={activeIndicator.id}
                    type="INDICATOR"
                  />
                </div>
              </section>
            </Content>
          );
        }
      }
    }
  )
);
