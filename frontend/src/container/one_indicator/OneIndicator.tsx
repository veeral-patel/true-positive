import { ArrowLeftOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { navigate, RouteComponentProps } from "@reach/router";
import {
  Col,
  Divider,
  Layout,
  message,
  notification,
  PageHeader,
  Row,
  Typography
} from "antd";
import { ApolloError } from "apollo-boost";
import IndicatorForm from "container/one_indicator/IndicatorForm";
import CreateComment from "container/shared/comments/CreateComment";
import DescriptionEditor from "container/shared/markdown/DescriptionEditor";
import { inject, observer } from "mobx-react";
import UPDATE_INDICATOR from "mutations/updateIndicator";
import CommentListP from "presentational/shared/comments/CommentListP";
import Error from "presentational/shared/errors/Error";
import EditableTagList from "presentational/shared/tags/EditableTagList";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import UIStore from "stores/UIStore";
import formatISO8601 from "utils/formatISO8601";
import { getPathToCaseIndicators } from "utils/pathHelpers";
import sortCommentsByCreatedAt from "utils/sortCommentsByCreatedAt";
import truncateString from "utils/truncateString";
import ActionsDropdown from "./ActionsDropdown";

const { Content } = Layout;
const { Text } = Typography;

interface Props extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
  uiStore?: UIStore;
  indicatorId?: number;
}

export default inject(
  "activeCaseStore",
  "uiStore"
)(
  observer(function OneIndicator(props: Props) {
    const { activeCaseStore, uiStore, indicatorId } = props;
    const activeCase = activeCaseStore!.activeCase;

    const [updateIndicator] = useMutation(UPDATE_INDICATOR, {
      onCompleted: function() {
        message.success("Updated the indicator");
        activeCaseStore!.loadActiveCase();
      },
      onError: function(error: ApolloError) {
        notification.error({
          message: "Could not update the indicator",
          description: error.message
        });
      }
    });

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
            backgroundColor: uiStore!.theme === "LIGHT" ? "#fff" : "#141414",
            padding: 24,
            height: "100%"
          }}
        >
          <PageHeader
            onBack={() => navigate(getPathToCaseIndicators(activeCase.id))}
            backIcon={<ArrowLeftOutlined style={{ fontSize: 14 }} />}
            title={
              <Text
                style={{ fontSize: 16 }}
                editable={{
                  onChange: (newName: string) =>
                    updateIndicator({
                      variables: {
                        input: {
                          id: activeIndicator.id,
                          name: newName
                        }
                      }
                    })
                }}
              >
                {truncateString(activeIndicator.name, 40)}
              </Text>
            }
            extra={
              <ActionsDropdown
                indicatorId={activeIndicator.id}
                caseId={activeCase.id}
              />
            }
          />
          <section style={{ lineHeight: 4 }}>
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
                          updateIndicator({
                            variables: {
                              input: {
                                id: activeIndicator.id,
                                indicator: newValue
                              }
                            }
                          })
                      }}
                    >
                      {truncateString(activeIndicator.indicator, 50)}
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
                  handleFinish={newTags =>
                    updateIndicator({
                      variables: {
                        input: {
                          id: activeIndicator.id,
                          tags: newTags
                        }
                      }
                    })
                  }
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
                updateIndicator({
                  variables: {
                    input: {
                      id: activeIndicator.id,
                      description: newDescription
                    }
                  }
                })
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
    return null;
  })
);
